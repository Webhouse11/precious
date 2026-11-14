# Security Specification — PGFV Ambassador Referral Management System

## 1. Data Invariants
1. **Strict RBAC**: Only verified administrators (`admins/{uid}` or bootstrapped verified owner email `olurantiprofile@gmail.com`) may approve/reject/suspend ambassadors, issue referral codes, reconcile WhatsApp orders, verify payments, update qualification statuses, approve/fulfil rewards, modify campaigns, or read customer PII (`orders`, `customers`, `payments`, `audit_logs`).
2. **Ambassador Isolation & Read-Only Metrics**: Ambassadors (`ambassadors/{uid}`) can read only their own profile, their own anonymized `referral_records`, their own `referral_visits`, their own `rewards`, and their own `notifications`. Ambassadors cannot edit `status`, `referralCode`, `confirmedReferralsCount`, `rewardStatus`, or any counters.
3. **Zero Customer PII Exposure**: Customer names, phone numbers, emails, and delivery addresses exist exclusively in `orders` and `customers` (admin-only reads). Ambassadors receive only anonymized `referral_records` (`orderRef`, `channel`, `orderSummaryLabel`, `paymentStatus`, `qualificationStatus`, `rejectionReason`).
4. **Duplicate Registration Prevention**: Ambassador registrations atomically create `ambassador_phone_index/{phoneKey}` and `ambassador_email_index/{emailKey}` guarded by `!exists(...)` in Firestore rules.
5. **Single-Order / Single-Customer Qualification**: `referral_records/{orderRef}` is 1-to-1 with `orders/{orderRef}`, and `rewards/{campaignId}_{ambassadorId}` prevents duplicate reward issuance per campaign.
6. **Temporal Integrity**: All `createdAt` and `updatedAt` timestamps must match `request.time`.

## 2. Dirty Dozen Adversarial Payloads (Must All Return PERMISSION_DENIED)
1. **Self-Approval Spoof**: Ambassador sends `create` on `/ambassadors/{uid}` with `status: "APPROVED"`, `referralCode: "PGFV-HACK1"`, or `confirmedReferralsCount: 10`. -> Denied by `incoming().status == 'PENDING_APPROVAL' && incoming().confirmedReferralsCount == 0 && incoming().referralCode == ''`.
2. **Counter Tampering**: Approved ambassador sends `update` on `/ambassadors/{uid}` incrementing `confirmedReferralsCount` to `10`. -> Denied because `update` on `/ambassadors` requires `isAdmin()`.
3. **Cross-Ambassador Snooping**: Ambassador A attempts `get` or `list` on `/ambassadors/{ambassadorB_uid}`. -> Denied by `isOwner(ambassadorId) || isAdmin()`.
4. **Customer PII Scraping**: Ambassador or unauthenticated visitor attempts `get` or `list` on `/orders` or `/customers`. -> Denied because `orders` and `customers` reads require `isAdmin()`.
5. **Unverified Payment Bypass**: Public order submitter attempts `create` on `/orders/{id}` with `paymentStatus: "VERIFIED_PAID"` or `qualificationState: "QUALIFIED"`. -> Denied by `incoming().paymentStatus == 'PENDING_VERIFICATION' && incoming().qualificationState == 'PENDING'`.
6. **Ghost Field / Shadow Update**: Authenticated user sends `create` on `/ambassadors/{uid}` with extra field `isAdmin: true`. -> Denied by `data.keys().hasOnly(...)`.
7. **Email Spoofing**: Attacker signs in with unverified email matching admin email (`email_verified: false`). -> Denied by `request.auth.token.email_verified == true`.
8. **ID Poisoning**: Attacker attempts write to `/referral_codes/` with 1,500-character ID or invalid characters `../admin`. -> Denied by `isValidId(id)` (`size() <= 128 && matches('^[a-zA-Z0-9_\\-]+$')`).
9. **Unauthorized Reward Approval**: Ambassador attempts `create` or `update` on `/rewards/{id}` with `status: "REWARD_COLLECTED"`. -> Denied because `rewards` writes require `isAdmin()`.
10. **Audit Log Tampering**: Any user (even admin) attempts `update` or `delete` on `/audit_logs/{logId}`. -> Denied by `allow update, delete: if false;`.
11. **Backdated Timestamp Attack**: User creates `/ambassadors/{uid}` with `createdAt: "2020-01-01T00:00:00Z"`. -> Denied by `incoming().createdAt == request.time`.
12. **Blanket List Enumeration on Referral Records**: Ambassador A queries `/referral_records` without filtering by `ambassadorId == request.auth.uid`. -> Denied by `allow list: if isAdmin() || (isSignedIn() && resource.data.ambassadorId == request.auth.uid)`.
