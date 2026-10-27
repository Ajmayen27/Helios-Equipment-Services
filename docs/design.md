
## Tool selection – custom components (LWC-01 to LWC-03, WBS 8-01)

| Need | Standard option considered | Why it is not enough | Decision |
|---|---|---|---|
| Capacity Calendar: dispatcher sees, for one week, every engineer with booked and free hours per day, and clicks through to the cases | Report (matrix by engineer x day), list view, dashboard chart | A report shows booked hours only; it cannot show free hours (working hours minus booked) for days with no bookings, cannot show part-time or not-scheduled engineers in the same grid, and cannot click a cell to open that day's cases | LWC `hesCapacityCalendar` on the Dispatcher home / app page |
| Schedule Timeline: on a case, see its segments against planned start, finish and status in one view | Related list "Work Segments" | A related list shows segments as rows only; it cannot show them on a date line next to planned start, finish, status and Needs Replanning, or mark weekends and holidays | LWC `hesScheduleTimeline` on the Case Technical Page |

Rules for both components:
- They only **display** data. All planning stays in `CaseSchedulingService` (Apex); the coverage value stays a formula (SVC-03). No component writes Work Segments or Capacity.
- Apex controllers are `with sharing` and query `WITH USER_MODE`, so users see only what their access allows.
- User-facing text comes from custom labels (HES_Lbl_*).
- Built with SLDS base components (lightning-card, lightning-badge, an SLDS table), so they look like standard Salesforce.
