---
layout: post
title: Relay42 vs Adobe :  A Detailed Comparison note from the Analysis
image: "/assets/img/project-images/relay-vs-adobe.png"
tags: [Customer Clustering, Machine Learning, Python]
category: experience
date: 2019-04-01
company: FedEx
---

## Background

In 2018, as FedEx completed its merger with TNT, I was part of a team tasked with evaluating the digital tools both companies used for customer journey management and tag management. TNT had been using Relay42, while FedEx was deeply integrated with Adobe Analytics and Adobe Dynamic Tag Management (DTM). The merger presented an opportunity to streamline and unify these platforms across the newly combined organization. This analysis, which I led, was crucial in deciding which platform would best serve the needs of the merged entity, particularly in the context of GDPR compliance and FedEx's extensive use of micro-sites like the Small Business Grant Contest.

## Relay42: Detailed Overview

**Relay42** is a customer data platform (CDP) known for combining tag management, data management, and customer journey orchestration. TNT had chosen Relay42 due to its ability to unify customer data across various European markets, delivering tailored experiences in compliance with strict GDPR regulations.

### Key Features:
1. **Tag Management:** Allows for easy management and deployment of tags across websites and applications, crucial for TNT's diverse European market presence.
2. **Data Management Platform (DMP):** Facilitates the collection, segmentation, and activation of customer data, ensuring compliance with GDPR by centralizing and securing data.
3. **Journey Orchestration:** Offers tools for managing personalized customer journeys across multiple touchpoints, which TNT used to create consistent experiences across its European operations.
4. **Integration Capabilities:** Easily integrates with various marketing technologies, CRM systems, and analytics platforms, providing TNT with the flexibility needed for their localized marketing efforts.

### Specific Needs and Use Cases:
- **GDPR Compliance:** Relay42 was chosen by TNT for its strong adherence to GDPR, enabling the company to manage customer data responsibly and transparently across Europe.
- **Localized Marketing:** Relay42's ability to handle complex data structures and segmentations allowed TNT to personalize customer journeys across different European regions, addressing local market needs effectively.

### Pros of Relay42:
1. **Ease of Use:** Intuitive interface that allowed TNT’s marketing teams to manage tags, data, and customer journeys with minimal friction.
2. **Unified Data View:** Provided TNT with a comprehensive view of customer interactions across multiple European markets.
3. **Personalization:** Strong focus on delivering personalized experiences through journey orchestration and data-driven insights, which was crucial for TNT’s regional marketing strategies.
4. **Real-time Capabilities:** Supported real-time data processing, enabling timely interactions—a key requirement for TNT's customer service initiatives.

### Cons of Relay42:
1. **Complexity:** While powerful, Relay42 could be complex to implement and manage, particularly as TNT integrated with FedEx’s more extensive global operations.
2. **Limited Market Presence:** Relay42’s smaller market presence meant fewer resources, community support, and third-party integrations, which could be a challenge during the merger.
3. **Scalability:** While suitable for TNT’s mid-sized operations, Relay42 might struggle to scale effectively across FedEx’s global footprint.

## Adobe Analytics and Adobe DTM: Detailed Overview

**Adobe Analytics** was the backbone of FedEx’s digital strategy, offering robust analysis and reporting capabilities. FedEx utilized Adobe DTM to manage tags and ensure accurate data collection across its many digital properties, including large-scale campaigns like the Small Business Grant Contest.

### Key Features of Adobe Analytics:
1. **Comprehensive Data Collection:** Enabled FedEx to gather detailed data on user interactions across its global web properties and micro-sites.
2. **Advanced Segmentation:** Allowed FedEx to create detailed customer segments based on behavior, demographics, and more, facilitating targeted campaigns like the Small Business Grant Contest.
3. **Real-Time Reporting:** Provided FedEx with real-time insights into customer behavior, crucial for optimizing ongoing campaigns.
4. **Predictive Analytics:** Leveraged AI (via Adobe Sensei) to predict customer behavior and optimize interactions—a key advantage for FedEx in managing its complex, global customer base.

### Pros of Adobe Analytics:
1. **Powerful Analysis Tools:** Offered advanced analytics capabilities, which were essential for FedEx’s large-scale operations and diverse customer base.
2. **Customization:** Highly customizable dashboards, reports, and segments tailored to FedEx's needs.
3. **Enterprise-Grade:** Designed for large enterprises, making it highly scalable for FedEx’s global operations.
4. **Strong Ecosystem:** Integrated seamlessly with other Adobe Experience Cloud tools, supporting FedEx’s broader digital marketing strategy.
5. **Robust Support and Community:** Extensive documentation, community support, and third-party integrations, offering FedEx the resources needed to manage complex operations.

### Cons of Adobe Analytics:
1. **Steep Learning Curve:** Although powerful, Adobe Analytics required significant expertise to master, necessitating training for FedEx’s global teams.
2. **Cost:** Adobe’s solutions were expensive, but justified by the value they provided to FedEx’s extensive digital initiatives.
3. **Implementation Complexity:** FedEx needed to invest considerable resources into implementing Adobe Analytics across its global properties.
4. **Overwhelming for Smaller Use Cases:** While suitable for FedEx’s large-scale needs, Adobe Analytics could be overwhelming for smaller or more localized operations.

## Adobe DTM (Dynamic Tag Management) Overview:
1. **Adobe DTM** was Adobe’s original tag management system, which FedEx used to ensure consistent data collection across its many digital properties. It has since been replaced by **Adobe Launch**, which offers more advanced features and better performance.

### Specific Needs and Use Cases:
- **Micro-Sites Management:** Adobe DTM played a crucial role in managing tags for FedEx's numerous micro-sites, including high-visibility campaigns like the Small Business Grant Contest. This ensured accurate tracking and reporting, which was essential for evaluating campaign performance.
- **GDPR Considerations:** Adobe’s robust data management features allowed FedEx to navigate GDPR requirements effectively, particularly when handling customer data from European regions.

### Pros of Adobe DTM:
1. **Integration with Adobe Products:** Seamlessly integrated with Adobe Analytics and other Adobe Experience Cloud tools, providing a unified platform for FedEx.
2. **Ease of Use:** Relatively straightforward for FedEx’s teams already familiar with the Adobe ecosystem.
3. **Customizable:** Allowed for the customization of rules and tags, tailored to the specific needs of FedEx’s various digital campaigns.

### Cons of Adobe DTM:
1. **Outdated:** Replaced by Adobe Launch, which offers more modern features and better performance.
2. **Limited Flexibility:** Compared to more modern tag management systems, DTM was less flexible in handling complex scenarios.
3. **Performance Issues:** Could be slower and less efficient compared to newer tag management systems.

## Why We Chose Adobe for Full Migration

### Context:
As part of the 2018 FedEx-TNT merger, we needed to choose a unified platform that could scale globally, manage complex data needs, and ensure compliance with GDPR. While TNT’s use of Relay42 had served its European operations well, FedEx’s broader requirements and the need for a cohesive global strategy led us to choose Adobe.

### Reasons for Choosing Adobe:
1. **Enterprise-Grade Solution:** Adobe offered an enterprise-grade solution capable of handling FedEx’s global operations, including the management of multiple micro-sites like the Small Business Grant Contest.
2. **Scalability:** Adobe’s tools were built to scale, making them the ideal choice for a company with FedEx’s global footprint.
3. **Advanced Analytics Capabilities:** Adobe Analytics provided the in-depth insights needed to optimize FedEx’s customer journeys across a wide range of markets and digital properties.
4. **Broader Ecosystem:** Adobe’s integration with other Experience Cloud tools allowed FedEx to create a seamless digital marketing ecosystem, enhancing the effectiveness of its campaigns.
5. **GDPR Compliance:** Adobe’s robust data management features ensured that FedEx could navigate GDPR requirements effectively, a critical consideration given the merger with TNT and the need to manage European customer data.

### Conclusion:
In conclusion, while Relay42 offered strong capabilities in customer journey orchestration and GDPR compliance, Adobe’s comprehensive suite of tools provided a more scalable, robust, and future-proof solution for FedEx. The decision to migrate fully to Adobe enabled us to unify our digital marketing efforts, streamline data management, and deliver personalized experiences at a global scale, ensuring the success of FedEx’s digital strategy in the post-merger landscape.

---

*This analysis was a key part of my role during the FedEx-TNT merger in 2018, demonstrating my ability to evaluate and implement digital tools that align with complex business needs and regulatory requirements. The experience enhanced my understanding of global digital strategy and reinforced the importance of choosing the right technology stack to support business objectives.*
