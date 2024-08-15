---

img: assets/img/project-images/logo_1681402541.473742.png
---

# Causal Analysis of Influencer Marketing on Jobber Summit Sign-ups

## Table of Contents
1. [Introduction](#introduction)
2. [Data Preparation](#data-preparation)
3. [Exploratory Data Analysis](#exploratory-data-analysis)
4. [Causal Impact Analysis](#causal-impact-analysis)
5. [Interpretation of Results](#interpretation-of-results)
6. [Conclusion and Recommendations](#conclusion-and-recommendations)

## Introduction

As a marketing analyst at Jobber, I conducted a pre-post analysis to evaluate the causal impact of influencer marketing spend on Facebook and Instagram on sign-ups for Jobber Summit. This analysis aimed to quantify the effectiveness of this marketing channel and inform future marketing strategies.

## Data Preparation

First, we need to prepare our data for analysis. We'll use pandas to load and preprocess the data.

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from statsmodels.tsa.seasonal import seasonal_decompose
from causalimpact import CausalImpact

# Load the data
def load_data(file_path):
    data = pd.read_csv(file_path)
    data['date'] = pd.to_datetime(data['date'])
    data.set_index('date', inplace=True)
    return data

# Usage
data = load_data('jobber_summit_data.csv')

# Display the first few rows
print(data.head())

# Check for missing values
print(data.isnull().sum())

# Fill missing values if necessary
data = data.fillna(method='ffill')
```

This code loads the data, converts the date column to datetime format, sets it as the index, and handles any missing values.

## Exploratory Data Analysis

Before diving into the causal analysis, it's crucial to understand our data through exploratory data analysis.

```python
# Plot time series of sign-ups
plt.figure(figsize=(12, 6))
plt.plot(data.index, data['sign_ups'])
plt.title('Jobber Summit Sign-ups Over Time')
plt.xlabel('Date')
plt.ylabel('Number of Sign-ups')
plt.show()

# Decompose the time series
decomposition = seasonal_decompose(data['sign_ups'], model='additive', period=7)
fig = decomposition.plot()
plt.tight_layout()
plt.show()

# Calculate correlation between variables
correlation_matrix = data.corr()
print(correlation_matrix)
```

This code creates a time series plot of sign-ups, decomposes the time series to observe trend and seasonality, and calculates correlations between variables.

## Causal Impact Analysis

Now, we'll use the CausalImpact package to perform our causal analysis. This package implements a Bayesian structural time-series model for estimating causal effects.

```python
# Prepare data for CausalImpact
pre_period = [data.index.min(), pd.to_datetime('2023-06-30')]  # Adjust as needed
post_period = [pd.to_datetime('2023-07-01'), data.index.max()]  # Adjust as needed

# Run CausalImpact analysis
ci = CausalImpact(data['sign_ups'], pre_period, post_period)

# Print summary
print(ci.summary())

# Plot results
ci.plot()
plt.show()
```

This code sets up the pre-intervention and post-intervention periods, runs the CausalImpact analysis, and generates a summary and plot of the results.

## Interpretation of Results

After running the causal impact analysis, we need to interpret the results carefully.

```python
# Extract key metrics
relative_effect = ci.summary_data.loc['average', 'RelativeEffect']
absolute_effect = ci.summary_data.loc['average', 'AbsEffect']
p_value = ci.summary_data.loc['average', 'p']

print(f"Relative Effect: {relative_effect:.2%}")
print(f"Absolute Effect: {absolute_effect:.2f}")
print(f"P-value: {p_value:.4f}")

# Interpret the results
if p_value < 0.05:
    if relative_effect > 0:
        print("The influencer marketing campaign had a significant positive impact on sign-ups.")
    else:
        print("The influencer marketing campaign had a significant negative impact on sign-ups.")
else:
    print("There is no statistically significant evidence of the campaign's impact on sign-ups.")
```

This code extracts key metrics from the CausalImpact results and provides a basic interpretation based on the p-value and relative effect.

## Conclusion and Recommendations

Based on the results of our causal analysis, we can draw conclusions and make recommendations for future marketing strategies.

```python
def generate_recommendations(relative_effect, p_value):
    recommendations = []
    
    if p_value < 0.05 and relative_effect > 0:
        recommendations.append("Continue and potentially expand influencer marketing efforts.")
        recommendations.append("Analyze which influencers drove the most sign-ups and focus on similar profiles.")
    elif p_value < 0.05 and relative_effect < 0:
        recommendations.append("Reevaluate the influencer marketing strategy.")
        recommendations.append("Conduct surveys or interviews to understand why the campaign may have had a negative impact.")
    else:
        recommendations.append("Consider running a longer campaign to gather more data.")
        recommendations.append("Explore other marketing channels that may have a more measurable impact.")
    
    recommendations.append("Continuously monitor and analyze the impact of marketing efforts.")
    
    return recommendations

# Generate and print recommendations
recommendations = generate_recommendations(relative_effect, p_value)
print("\nRecommendations:")
for i, rec in enumerate(recommendations, 1):
    print(f"{i}. {rec}")
```

This code generates recommendations based on the analysis results, providing actionable insights for the marketing team.

By following this analysis process, we can gain valuable insights into the effectiveness of our influencer marketing campaign for Jobber Summit sign-ups. This data-driven approach allows us to make informed decisions about future marketing strategies and budget allocations.
