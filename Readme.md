# Project Assignment: PromiseMaster – Advanced Parallel Data Aggregator

## Project Title

**PromiseMaster: Parallel Data Fetching with Advanced Error Handling**

---

## Overview

Build a console-based JavaScript application that simulates fetching data from multiple unreliable APIs using Promises. The project will require you to use `Promise.all`, `Promise.allSettled`, and `Promise.race` for parallel execution, implement advanced error handling (including retries and timeouts), merge and reconcile data from different sources, and generate consistency and performance reports.

---

## Functional Requirements

- **Multi-Source Data Fetching:**  
  Simulate fetching user data from three different API endpoints. Each endpoint has its own response time and chance to fail.
- **Promise Combinators:**  
  Use `Promise.all` for critical parallel requests, `Promise.race` for timeout handling, and `Promise.allSettled` for comprehensive result analysis.
- **Error Handling:**  
  Implement exponential backoff for retries, fallback to cached data when all APIs fail, and distinguish between transient (retryable) and permanent errors.
- **Data Processing:**  
  Merge data from successful sources, detect and reconcile data conflicts, and generate a consistency report.

---

## Input and Output Specifications

### Inputs

- **API Configuration:**  
  Example: `{ retryCount: 3, timeout: 2000, useCache: true }`
- **Data Sources:**  
  Array of endpoint URLs with reliability scores, e.g.  
  `['api/users/main', 'api/users/backup', 'api/users/legacy']`

### Outputs

- **Success Report:**

{
"data": { ...mergedResult },
"sourcesUsed": ["api/users/main", "api/users/backup"],
"warnings": ["api/users/legacy failed after 2 retries"]
}

- **Performance Metrics:**

{
"totalTime": "1.8s",
"retries": 1,
"dataConsistency": "92%"
}

---

## Example Input/Output

### Example 1: Partial Success

Input:
fetchData(
['api/users/main', 'api/users/backup', 'api/users/legacy'],
{ retryCount: 2, timeout: 1500 }
)

Output:
✅ Data aggregated from 2/3 sources
⚠️ api/users/legacy failed after 2 retries
📊 Consistency: 92% match between sources
⏱ Total time: 1.8s with 1 retry

### Example 2: Critical Failure

Input:
fetchData(
['api/users/primary'],
{ retryCount: 3, timeout: 1000 }
)

Output:
❌ All sources failed!
🔄 Using cached data (updated 2 hours ago)
⚠️ Primary API timeout (3 retries)

### Example 3: Race Condition

Input:
Promise.race([
fetchUserData(),
timeout(500)
])

Output:
⏱ API response too slow (500ms)
🔁 Switching to secondary source...
