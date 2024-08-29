---
layout: post
title: Clustering Customers based their known Price Sensitivity
image: "/assets/img/project-images/price-clustering.png"
tags: [Customer Clustering, Machine Learning, Python]
category: experience
subsection: "Data Analytics"
date: 2019-04-01
company: FedEx
excerpt: This document outlines the cluster of customers work that I supported on along with the Pricing Science department at FedEx Express.
---


This document outlines the three pricing science problem statements that I worked on along with the Pricing Science department at FedEx Express. For each case, I will provide a detailed problem statement, description of the data used (representative and cleaned), methodology, and code snippets (representative) to implement the solution.

## Customer Segmentation for Targeted Pricing

### Problem Statement

Segment FedEx Express customers based on their shipping behavior and price sensitivity to enable targeted pricing strategies.

### Data Used

1. Customer shipping history
2. Revenue per customer
3. Frequency of shipments
4. Average shipment value
5. Customer responses to past pricing changes

### Method

We used K-means clustering for customer segmentation here. Below is a sample code method we used for this analysis

### Implementation

#### Step 1: Data Preparation

First, we'll load and preprocess our data:

```python
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA
import matplotlib.pyplot as plt
import seaborn as sns

def load_and_preprocess_data(file_path):
    data = pd.read_csv(file_path)
    
    features = ['total_revenue', 'shipment_frequency', 'avg_shipment_value', 'price_sensitivity']
    X = data[features]
    
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    return X_scaled, data

# Usage
X_scaled, data = load_and_preprocess_data('fedex_customer_data.csv')
```

This code loads the data, selects relevant features, and scales them.

#### Step 2: Perform Clustering

Next, we'll perform K-means clustering:

```python
def perform_clustering(X_scaled, n_clusters=4):
    kmeans = KMeans(n_clusters=n_clusters, random_state=42)
    clusters = kmeans.fit_predict(X_scaled)
    return clusters

# Usage
clusters = perform_clustering(X_scaled)
```

#### Step 3: Visualize Clusters

We'll visualize the clusters using PCA for dimensionality reduction:

```python
def visualize_clusters(X_scaled, clusters):
    pca = PCA(n_components=2)
    X_pca = pca.fit_transform(X_scaled)
    
    plt.figure(figsize=(10, 8))
    scatter = plt.scatter(X_pca[:, 0], X_pca[:, 1], c=clusters, cmap='viridis')
    plt.title('Customer Segments')
    plt.xlabel('First Principal Component')
    plt.ylabel('Second Principal Component')
    plt.colorbar(scatter)
    plt.show()

# Usage
visualize_clusters(X_scaled, clusters)
```

#### Step 4: Analyze Segments

We'll analyze the characteristics of each segment:

```python
def analyze_segments(data, clusters):
    data['Cluster'] = clusters
    segment_analysis = data.groupby('Cluster').agg({
        'total_revenue': 'mean',
        'shipment_frequency': 'mean',
        'avg_shipment_value': 'mean',
        'price_sensitivity': 'mean'
    }).round(2)
    
    print("Segment Analysis:")
    print(segment_analysis)
    
    plt.figure(figsize=(12, 8))
    sns.heatmap(segment_analysis, annot=True, cmap='YlGnBu', fmt='.2f')
    plt.title('Customer Segment Characteristics')
    plt.show()

# Usage
analyze_segments(data, clusters)
```

#### Step 5: Recommend Pricing Strategies

Finally, we'll recommend pricing strategies based on the segment characteristics:

```python
def recommend_pricing_strategies(segment_analysis):
    strategies = []
    for cluster, characteristics in segment_analysis.iterrows():
        if characteristics['price_sensitivity'] < 0.4:
            if characteristics['total_revenue'] > segment_analysis['total_revenue'].median():
                strategies.append(f"Cluster {cluster}: Premium pricing with loyalty rewards")
            else:
                strategies.append(f"Cluster {cluster}: Gradual price increases with added value services")
        elif characteristics['price_sensitivity'] > 0.7:
            if characteristics['shipment_frequency'] > segment_analysis['shipment_frequency'].median():
                strategies.append(f"Cluster {cluster}: Volume discounts and competitive base rates")
            else:
                strategies.append(f"Cluster {cluster}: Promotional pricing to increase shipment frequency")
        else:
            strategies.append(f"Cluster {cluster}: Balanced pricing with focus on service quality")
    
    print("\nRecommended Pricing Strategies:")
    for strategy in strategies:
        print(strategy)

# Usage
recommend_pricing_strategies(segment_analysis)
```

This function provides basic pricing strategy recommendations based on the characteristics of each segment.
