# Pricing Science Examples for FedEx Express

This document outlines the three pricing science problem statements that I worked on along with the Pricing Science department at FedEx Express. For each case, I will provide a detailed problem statement, description of the data used (representative and cleaned), methodology, and code snippets (representative) to implement the solution.

## Table of Contents

- [1. Dynamic Pricing Optimization](#dynamic-pricing-optimization)
- [2. Customer Segmentation for Targeted Pricing](#customer-segmentation-for-targeted-pricing)
- [3. Fuel Surcharge Optimization](#fuel-surcharge-optimization)

## 1. Dynamic Pricing Optimization

### Problem Statement

Develop a dynamic pricing model that adjusts prices in real-time based on demand, capacity, and market conditions to maximize revenue for FedEx Express.

### Data Used

1. Historical shipping data
2. Capacity data
3. Market condition indicators
4. Competitor pricing data
5. Customer behavior data

### Method

We'll use a Random Forest Regression model for price prediction. This model can capture complex relationships between various factors and the optimal price.

### Implementation

#### Step 1: Data Preparation and Preprocessing

First, we'll load and preprocess our data:

```python
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
import matplotlib.pyplot as plt

def load_data(file_path):
    data = pd.read_csv(file_path)
    return data

def preprocess_data(data):
    features = ['demand', 'capacity', 'market_index', 'competitor_price', 'customer_segment']
    X = data[features]
    y = data['optimal_price']
    
    X = pd.get_dummies(X, columns=['customer_segment'])
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    return X_train_scaled, X_test_scaled, y_train, y_test, scaler

# Usage
data = load_data('fedex_shipping_data.csv')
X_train, X_test, y_train, y_test, scaler = preprocess_data(data)
```

This code loads the data, selects relevant features, performs one-hot encoding on categorical variables, splits the data into training and test sets, and scales the features.

#### Step 2: Model Training

Next, we'll train our Random Forest model:

```python
def train_model(X_train, y_train):
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    return model

# Usage
model = train_model(X_train, y_train)
```

#### Step 3: Model Evaluation

We'll evaluate our model using the Root Mean Squared Error (RMSE):

```python
def evaluate_model(model, X_test, y_test):
    y_pred = model.predict(X_test)
    rmse = np.sqrt(mean_squared_error(y_test, y_pred))
    return rmse

# Usage
rmse = evaluate_model(model, X_test, y_test)
print(f"Model RMSE: {rmse:.2f}")
```

#### Step 4: Real-time Price Adjustment

Finally, we'll create a function to adjust prices in real-time based on current conditions:

```python
def adjust_price_realtime(model, scaler, current_conditions):
    input_data = pd.DataFrame([current_conditions])
    input_data_encoded = pd.get_dummies(input_data, columns=['customer_segment'])
    input_data_scaled = scaler.transform(input_data_encoded)
    predicted_price = model.predict(input_data_scaled)[0]
    return predicted_price

# Example usage
current_conditions = {
    'demand': 0.7,
    'capacity': 0.8,
    'market_index': 105,
    'competitor_price': 50,
    'customer_segment': 'business'
}
optimal_price = adjust_price_realtime(model, scaler, current_conditions)
print(f"Optimal price for current conditions: ${optimal_price:.2f}")
```

This function takes in the current market conditions and uses our trained model to predict the optimal price.

## 2. Customer Segmentation for Targeted Pricing

### Problem Statement

Segment FedEx Express customers based on their shipping behavior and price sensitivity to enable targeted pricing strategies.

### Data Used

1. Customer shipping history
2. Revenue per customer
3. Frequency of shipments
4. Average shipment value
5. Customer responses to past pricing changes

### Method

We'll use K-means clustering for customer segmentation.

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

## 3. Fuel Surcharge Optimization

### Problem Statement

Develop a model to accurately predict fuel costs and optimize surcharges to maintain profitability without alienating customers for FedEx Express.

### Data Used

1. Historical fuel prices
2. Fuel consumption data
3. Historical surcharge data
4. Customer feedback on surcharges
5. Competitor surcharge information

### Method

We'll use ARIMA (AutoRegressive Integrated Moving Average) for fuel price forecasting and optimization.

### Implementation

#### Step 1: Data Preparation

First, we'll load and prepare our data:

```python
import pandas as pd
import numpy as np
from statsmodels.tsa.arima.model import ARIMA
from sklearn.metrics import mean_squared_error
import matplotlib.pyplot as plt

def load_data(file_path):
    data = pd.read_csv(file_path, parse_dates=['date'], index_col='date')
    return data

# Usage
fuel_data = load_data('fedex_fuel_data.csv')
```

#### Step 2: Train ARIMA Model

Next, we'll train our ARIMA model:

```python
def train_arima_model(data, order=(1,1,1)):
    model = ARIMA(data['fuel_price'], order=order)
    results = model.fit()
    return results

# Usage
model = train_arima_model(fuel_data)
```

#### Step 3: Forecast Fuel Prices

We'll use our trained model to forecast future fuel prices:

```python
def forecast_fuel_prices(model, steps=30):
    forecast = model.forecast(steps=steps)
    return forecast

# Usage
forecasted_prices = forecast_fuel_prices(model)
```

#### Step 4: Calculate Optimal Surcharge

We'll calculate the optimal surcharge based on forecasted prices:

```python
def calculate_optimal_surcharge(forecasted_prices, base_rate, target_margin):
    surcharge = (forecasted_prices - base_rate) * (1 + target_margin)
    return np.maximum(surcharge, 0)  # Ensure non-negative surcharge

# Usage
base_rate = fuel_data['fuel_price'].mean()
target_margin = 0.15  # Example target margin
surcharges = calculate_optimal_surcharge(forecasted_prices, base_rate, target_margin)
```

#### Step 5: Visualize Results

We'll visualize our forecasted prices and calculated surcharges:

```python
def visualize_results(actual, forecasted, surcharges):
    plt.figure(figsize=(12, 6))
    plt.plot(actual.index, actual, label='Actual Fuel Prices')
    plt.plot(forecasted.index, forecasted, label='Forecasted Fuel Prices')
    plt.plot(surcharges.index, surcharges, label='Calculated Surcharges')
    plt.title('Fuel Price Forecast and Optimal Surcharges')
    plt.xlabel('Date')
    plt.ylabel('Price/Surcharge ($)')
    plt.legend()
    plt.show()

# Usage
visualize_results(fuel_data['fuel_price'][-90:], forecasted_prices, surcharges)
```

#### Step 6: Analyze Customer Impact

Finally, we'll analyze the potential impact on customers:

```python
def analyze_customer_impact(surcharges, customer_data):
    surcharge_increase = surcharges.pct_change().mean()
    customer_churn_estimate = surcharge_increase * 0.5  # Simplified relationship
    revenue_impact = surcharge_increase * customer_data['total_revenue'].sum() * (1 - customer_churn_estimate)
    
    print(f"Estimated customer churn: {customer_churn_estimate:.2%}")
    print(f"Estimated revenue impact: ${revenue_impact:,.2f}")

# Usage
customer_data = load_data('fedex_customer_data.csv')
analyze_customer_impact(surcharges, customer_data)
```

This function provides a simplified analysis of how the surcharge changes might impact customer churn and revenue.

By implementing these three pricing science examples, FedEx Express can optimize its pricing strategies, better understand its customer base, and manage fuel surcharges effectively. Each of these models provides valuable insights that can lead to increased revenue and improved customer satisfaction.
