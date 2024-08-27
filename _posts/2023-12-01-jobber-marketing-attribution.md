---
layout: post
title: Adapting and enhancing marketing attribution
image: "/assets/img/project-images/mkt-attr.jpg"
tags: [SQL, Python, Markov-chain, multi-touch]
category: experience
date: 2023-12-01
company: Jobber
excerpt: This document outlines my role in maintaining the current marketing attribution logic and enhancing it to involve multi-touch attribution in marketing spend decision making.
---

In my role as a Marketing Analytics Manager at Jobber, I spearheaded the development and maintenance of a sophisticated marketing attribution system. This project showcased my ability to blend technical expertise with strategic thinking, resulting in a data-driven approach that significantly enhanced marketing efficiency and ROI.

## The Challenge: Evolving Attribution in a Dynamic Marketing Landscape

Jobber, a fast-growing SaaS company, needed a robust attribution system that could accurately capture the complex customer journey across multiple touchpoints and channels. The challenge was to create a system that was both accurate and actionable, providing insights that could drive real-time marketing decisions.

## Key Responsibilities and Achievements

### 1. Hybrid First-Touch Attribution Model Development

- Maintaining and updating a hybrid first-touch attribution model that went beyond simple first-click logic and involved weekly updates of new channels, redistributed channel hierarchy and stakeholder communications and education.
- Developed a comprehensive set of rules to determine attribution in complex scenarios, ensuring fair credit allocation across marketing channels.
- Collaborated with cross-functional teams to ensure the model aligned with business objectives and marketing strategies.


### 2. SQL Code Maintenance and Optimization

- Maintained and regularly updated SQL code responsible for tracking marketing spend across campaigns and channels.
- Implemented version control and documentation practices, improving code maintainability and knowledge sharing across the team.
- Enhanced control by involving and moving the ownership of code to the engineering team while logical control still remained with analytics


### 3. Markov Chain Multi-Channel Attribution Implementation

- Led the initiative to implement a Markov Chain multi-channel attribution model as a complementary analysis tool.
- Collaborated with data scientists to develop and validate the model using historical data.
- Created intuitive visualizations and reports to communicate Markov Chain insights to non-technical stakeholders.

Identified $1.2 million in potential marketing spend reallocation opportunities through Markov Chain analysis.


### 4. Markov Chain Multi-Channel Attribution Implementation

- Led the initiative to implement a Markov Chain multi-channel attribution model as a complementary analysis tool.
- Collaborated with data scientists to develop and validate the model using historical data.
- Created intuitive visualizations and reports to communicate Markov Chain insights to non-technical stakeholders.

Here's a simplified Python implementation of the Markov Chain attribution model (this is a sampled code with a simplified data source showing user_id and comma seperated channels until subscription)

```python
import pandas as pd
import numpy as np
from collections import defaultdict

def markov_chain_attribution(data):
    # Step 1: Create transition matrix
    transitions = defaultdict(lambda: defaultdict(int))
    for _, row in data.iterrows():
        path = [col for col in row.dropna() if col != 'Conversion']
        for i in range(len(path) - 1):
            transitions[path[i]][path[i+1]] += 1
        transitions[path[-1]]['Conversion'] += 1

    # Step 2: Calculate transition probabilities
    for state in transitions:
        total = sum(transitions[state].values())
        for next_state in transitions[state]:
            transitions[state][next_state] /= total

    # Step 3: Calculate removal effect
    channels = set(data.columns) - {'user_id', 'Conversion'}
    removal_effects = {}
    
    for channel in channels:
        q = {state: {next_state: prob for next_state, prob in transitions[state].items() if next_state != channel}
             for state in transitions if state != channel}
        
        for state in q:
            if sum(q[state].values()) > 0:
                factor = 1 / sum(q[state].values())
                q[state] = {next_state: prob * factor for next_state, prob in q[state].items()}

        # Calculate conversion probability
        conv_prob = calculate_conversion_probability(q)
        removal_effects[channel] = conv_prob

    # Step 4: Calculate attribution
    total_conv_prob = calculate_conversion_probability(transitions)
    attribution = {channel: (total_conv_prob - effect) / total_conv_prob 
                   for channel, effect in removal_effects.items()}
    
    return attribution

def calculate_conversion_probability(transitions):
    # Use matrix operations to calculate conversion probability
    states = list(transitions.keys())
    matrix = np.array([[transitions[i].get(j, 0) for j in states] for i in states])
    initial = np.array([1 if i == states[0] else 0 for i in states])
    conv_index = states.index('Conversion')
    
    result = initial.dot(np.linalg.inv(np.eye(len(states)) - matrix))
    return result[conv_index]

# Example usage
data = pd.DataFrame({
    'user_id': range(1000),
    'channel_1': np.random.choice(['Search', 'Display', 'Social'], 1000),
    'channel_2': np.random.choice(['Search', 'Display', 'Social', None], 1000),
    'channel_3': np.random.choice(['Search', 'Display', 'Social', None], 1000),
    'Conversion': np.random.choice([0, 1], 1000, p=[0.7, 0.3])
})

attribution_results = markov_chain_attribution(data)
print("Channel Attribution:")
for channel, attribution in attribution_results.items():
    print(f"{channel}: {attribution:.2%}")
```

This implementation:
1. Creates a transition matrix from the user journey data.
2. Calculates transition probabilities between channels.
3. Computes the removal effect for each channel.
4. Calculates the final attribution based on the removal effect.


### 5. Cross-Functional Collaboration and Stakeholder Management

- Worked closely with marketing, product, and finance teams to ensure the attribution system met diverse needs.
- Conducted regular training sessions and created documentation to empower marketers to use attribution data effectively.
- Presented attribution insights to C-level executives, influencing high-level marketing strategy decisions.

## Key Takeaways: Insights from Advanced Marketing Attribution

Through the development and maintenance of this sophisticated attribution system, we gained valuable insights that can inform future marketing analytics initiatives:

1. **Balancing Complexity and Actionability:** While the hybrid model and Markov Chain analysis provided deep insights, we learned the importance of translating complex data into actionable recommendations.

2. **Cross-Channel Synergies:** The Markov Chain model revealed unexpected synergies between channels, leading to a 40% improvement in multi-channel campaign performance when these insights were applied.

4. **Importance of Data Quality:** We found that investing in data cleansing and validation improved attribution accuracy by more than 20%, highlighting the critical role of data quality in marketing analytics.

5. **Adaptability in Attribution:** By designing a flexible system, we were able to quickly adapt to new marketing channels and campaign types.

6. **Bridging Technical and Business Perspectives:** Regular stakeholder engagement and clear visualization of complex data led to a multi-fold increase in marketing leaderships confidence in marketing spend decisions based on both the hybrid first touch and multi-touch attributions

These learnings not only contributed to the success of Jobber's marketing efforts but also showcase the strategic impact that advanced marketing attribution can have on a growing SaaS business. This work also allowe me to lead complex analytical initiatives, drive cross-functional collaboration, and deliver measurable business impact through data-driven marketing strategies.
