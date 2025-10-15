---
title: 'Modernization of Legacy Application Dashboard'
date: '2023-10-26'
---

## **Project Overview: Modernization of Legacy Application Dashboard**

| STAR Component | Detail |
| :---- | :---- |
| **Project Title** | **Modernization of Legacy Application Dashboard** (via Micro Frontends) |
| **Company** | Blaze |
| **Role** | VP of Software Engineering (Contextual knowledge used to frame project scope and impact) |
| **Timeline** | **6 months** (Calendar Time) /  **1,000 Man-Hours** (Project Time) |

---

### **S \- Situation: The Challenge**

The core user portal, the **"Retail Dashboard,"** was built on a severely outdated and brittle technology stack, characterized by technical debt that actively hampered development velocity and product quality.

* **Development Pain Points:** The application used **raw JavaScript** with **no TypeScript** and suffered from a complete lack of **automated testing** (UI or coded). Developers frequently introduced **breaking changes** in unrelated parts of the application, forcing extensive, manual regression testing by QA for every minor release.  
* **Technical Debt:** The dashboard was blocked by obsolete and unsupported dependencies, notably the **@sketchpixy/rubix** theme and its bundled old plugin stack (jQuery, Moment, Chart.js, etc.). This prevented upgrading the application to modern frameworks like **MUI v5** and newer Node toolchains, which in turn caused style conflicts with newer components being introduced via separate Micro Frontends (MFEs). Furthermore, the host dashboard exhibited **caching issues** that prevented all users from consistently receiving the latest version of the webpage upon release.  
* **User Experience:** The existing UI/UX was **outdated and difficult to navigate**, contributing to poor user engagement.

---

### **T \- Task: The Objective**

The primary goal was to modernize the application to enable rapid, stable, and componentized development by migrating to a supported technology stack, ultimately improving developer experience and code quality without disrupting core business functionality.

The key objectives were:

1. **Adopt Modern Libraries:** Successfully integrate **MUI v5** and other modern, supported libraries.  
2. **Improve Code Quality:** Implement **TypeScript** to protect against runtime type errors.  
3. **Enable Scalable Development:** Establish a pattern that allows developers to add new functionality without requiring deep context in outdated, bug-prone tools, and to **build UI components once for reuse** across multiple products.  
4. **Resolve Legacy Toolchain Issues:** Eliminate dependencies on tools that were unsupported or carried high licensing fees.

---

### **A \- Action: Strategy and Execution**

The team implemented a **Strangler Fig Application pattern** using **Micro Frontends (MFEs)** to isolate new development from the legacy host. The overall effort involved 14 individuals across two teams, including developers, QAs, Product Managers, and DevOps staff.

1. **Initial Unblocking (2 months):** **1-2 developers** were dedicated to a 'big bang' update of critical underlying libraries to unblock the adoption of the MFE pattern.  
2. **MFE Strategy & Implementation:**  
   * **Architecture:** The team adopted the **single-spa.js** framework to host the MFEs. A custom configuration was required as the legacy host dashboard was incompatible with newer Webpack versions, forcing the team to bundle the MFEs using Webpack configured to output **SystemJS format**.  
   * **Deployment:** MFEs were deployed as static SystemJS modules to **AWS S3**. The host dashboard was configured to dynamically load and integrate these MFEs at runtime using an import map, allowing the MFE and host application to share the same DOM and JavaScript context without using iFrames.  
3. **Cross-Product Interoperability:** A significant challenge was the disparity in Auth/JWT tokens between the host dashboard and other monolith products where the MFEs would be reused. **1 developer** spent **1 month** building an **AWS Lambda Authorizer** that could securely exchange one Auth token for another. This Authorizer was later integrated into the Platform API Gateway, further enabling the organization's microservices strategy.  
4. **MFE Development:** A dedicated team of **4 developers** completed the first new-functionality MFE within **2 months**.  
5. **Cache Resolution:** **1 developer** spent **2 weeks** to solve the persistent caching issue, implementing a mechanism to detect a new version and prompt users to refresh the page.

---

### **R \- Result: Outcomes and Impact**

The project successfully modernized the platform's development capabilities and significantly reduced maintenance overhead, directly impacting developer velocity and product stability.

* **Organizational Adoption:** The project **enabled the adoption of the MFE pattern across the entire organization**, establishing a technical precedent and framework for future application modernization.  
* **Reusability & Efficiency:** Achieved the goal of **"build once, use many"** by deploying a single MFE across **3 different monolith products**, resulting in a significant reduction in duplicate development effort.  
* **Code Stability & Quality:** The implementation of TypeScript and the isolation provided by the MFE pattern dramatically improved code stability. The rate of **escaped bugs was reduced from 10-15 per month to 2-3 per month.**  
* **Developer Velocity:** The shift to modern tooling and a componentized architecture contributed significantly to a massive reduction in cycle time, which fell **from 10 weeks to under 1 week.**  
* **Performance:** MFEs were successfully integrated without negatively impacting page load speed, maintaining existing **high-performant** timing standards.