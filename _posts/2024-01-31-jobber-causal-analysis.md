---
layout: post
title: Pre - Post Analysis of Influencer Marketing on Jobber Summit Sign-ups
image: "/assets/img/project-images/jobber-logo.png"
tags: [Causal Impact, Python]
category: experience
date: 2024-01-18
company: Jobber
excerpt: This post details a case study involving analysing the impact of a influencer campaign on Sign-ups for Jobber Summit
---


## Table of Contents
1. [Introduction](#introduction)
2. [Objectives](#objectives)
3. [Data Collection](#data-collection)
5. [Handling Concurrent Campaigns](#handling-concurrent-campaigns)
6. [Influencer Performance Analysis](#influencer-performance-analysis)
7. [Results](#results)
8. [Insights and Recommendations](#insights-and-recommendations)

## Introduction

During my tenure at Jobber, I was responsible for assessing the effectiveness of an influencer campaign designed to boost signups for the Jobber Summit. This campaign ran on Facebook and Instagram, utilizing four different influencers to reach targeted audiences. However, the analysis was made more complex by the presence of other concurrent marketing efforts through different channels, which required careful consideration in isolating the impact of the influencer campaign.

## Objectives

1. **Measure the impact** of the influencer campaign on Jobber Summit signups.
2. **Isolate the effects** of this campaign from other concurrent campaigns.
3. **Analyze the individual performance** of each influencer.
4. **Provide actionable insights** to optimize future influencer campaigns.

For target audience, we relied on our overall target audience growth target for the year which was the "Just me" segment of Jobber potential users and the free tier users.

## Data Collection

The data was sourced from:
- **Facebook and Instagram Analytics**: Tracking reach, engagement, and CTR for each influencer.
- **Jobber’s CRM**: Tracking daily signup data.
- **Marketing Analytics Tools**: Monitoring other concurrent campaigns, including email marketing, PPC, and SEO efforts, to adjust for any overlapping effects.

The dataset included:
- **Pre-Campaign Period**: The week before the influencer campaign.
- **Campaign Period**: The middle two weeks of the month.
- **Post-Campaign Period**: The week following the campaign.

## Handling Concurrent Campaigns

To isolate the influencer campaign’s impact, I used a combination of methods:
- **Control Groups**: By comparing signup data from channels unaffected by the influencer campaign.
- **Time-Series Analysis**: To identify and adjust for trends or spikes related to other campaigns.
- **Attribution Modeling**: To determine the contribution of each channel, ensuring the influencer campaign’s effect was accurately measured.

  ## Influencer Performance Analysis

Four influencers were chosen for this campaign, each with different audience demographics and engagement levels. I analyzed the performance of each influencer to understand their unique contributions to the campaign’s success.

```python
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from statsmodels.stats.weightstats import ztest

# Load the data
data = pd.read_csv('jobber_summit_signups.csv')

# Filter out data from other campaigns
data = data[(data['channel'] == 'influencer') & 
            ((data['medium'] == 'facebook') | (data['medium'] == 'instagram'))]

# Analyze influencer-specific performance
influencer_data = data.groupby('influencer').agg({
    'reach': 'sum',
    'engagement': 'mean',
    'signups': 'sum'
}).reset_index()

# Convert the 'date' column to datetime if it's not already
data['date'] = pd.to_datetime(data['date'])

# Define the date ranges for each period
pre_campaign_dates = (data['date'] >= '2023-11-01') & (data['date'] <= '2023-11-14')
campaign_dates = (data['date'] >= '2023-11-15') & (data['date'] <= '2023-11-30')
post_campaign_dates = (data['date'] >= '2023-12-01') & (data['date'] <= '2023-12-14')

# Filter the data for each period
pre_campaign = data[pre_campaign_dates]
during_campaign = data[campaign_dates]
post_campaign = data[post_campaign_dates]

avg_signups_pre = pre_campaign['signups'].mean()
avg_signups_during = during_campaign['signups'].mean()
avg_signups_post = post_campaign['signups'].mean()

# Visualize influencer performance
plt.figure(figsize=(12,6))
sns.barplot(x='influencer', y='signups', data=influencer_data)
plt.title('Influencer Performance: Signups Generated')
plt.xlabel('Influencer')
plt.ylabel('Total Signups')
plt.show()

# Perform a z-test to compare pre-campaign and post-campaign signup rates
z_stat, p_val = ztest(pre_campaign['signups'], post_campaign['signups'])

print(f'Average Signups (Pre-Campaign): {avg_signups_pre:.2f}')
print(f'Average Signups (During Campaign): {avg_signups_during:.2f}')
print(f'Average Signups (Post-Campaign): {avg_signups_post:.2f}')
print(f'Z-Statistic: {z_stat:.2f}, P-Value: {p_val:.4f}')
```

## Results (only for illustration)

- **Average Signups**:
  - **Pre-Campaign**: 50 signups/day
  - **During Campaign**: 70 signups/day
  - **Post-Campaign**: 55 signups/day

The influencer campaign resulted in a increase in signups, with a 40% rise during the campaign period compared to pre-campaign levels. Even after the campaign ended, signups remained 10% higher.

- **Influencer Performance**:
  - **Influencer A**: Generated the highest reach but moderate signups.
  - **Influencer B**: Had the highest engagement rate and the second-highest signups.
  - **Influencer C**: Contributed to a steady number of signups, mainly from niche audiences.
  - **Influencer D**: Had the least reach but the highest conversion rate, driving a significant number of signups per engagement.

- **Statistical Significance**:  
  The Z-test did not confirm that the difference in signup rates before and after the campaign was statistically significant.

## Insights and Recommendations

1. **Influencer Selection**: The varied performance of the influencers highlighted the importance of selecting individuals whose audience closely aligns with the campaign goals. Influencer D, despite lower reach, delivered the best conversion rate, making them a valuable asset for future campaigns.
  
2. **Concurrent Campaigns**: Adjusting for other campaigns revealed that the influencer campaign was a driver of signups, but the inference of the post campaign effect was not as straight forward as during the campaign

3. **Data-Driven Adjustments**: Continuous monitoring and adjustments during the campaign could have optimized results further, especially by shifting focus to higher-performing influencers.

## Conclusion

This case study demonstrated the effectiveness of a well-executed influencer campaign in driving signups for the Jobber Summit, even amid other concurrent marketing efforts. But it was far less obvious for any lingering effects of the campaign.
