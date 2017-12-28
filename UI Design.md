# UI Design

**states:**

- Disabled
- Enabled
- Break



```mermaid
graph LR
	disabled
	enabled
	break

	disabled -- "power" --> enabled

	enabled -- "distraction" --> break

	break -- "power" --> disabled
	enabled -- "power" --> disabled


```



**data:**

- Disabled
  - Time Working Today
- Enabled
  - Current Time Working
  - Should take break soon?
  - Is in "the zone"?
  - How many distractions?
- Break
  - How long is left in the break

options:
	- blocked websites
	- focus website
