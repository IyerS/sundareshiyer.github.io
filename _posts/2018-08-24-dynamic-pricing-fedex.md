# Linear Regression for Customer Loyalty Prediction

## Table of Contents
- [Project Overview](#project-overview)
- [Data Import](#data-import)
- [Data Preprocessing](#data-preprocessing)
- [Model Training](#model-training)
- [Model Performance Assessment](#model-performance-assessment)
- [Model Summary Statistics](#model-summary-statistics)

## Project Overview

In this project, we aim to predict customer loyalty scores for a grocery retailer. We'll use Linear Regression as our first approach to build a predictive model. The goal is to find relationships between customer metrics and loyalty scores for customers who were tagged, and use this to predict loyalty scores for those who were not.

## Data Import

We start by importing the necessary libraries and loading our preprocessed data from a pickle file.

```python
import pandas as pd
import pickle
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.utils import shuffle
from sklearn.model_selection import train_test_split, cross_val_score, KFold
from sklearn.metrics import r2_score
from sklearn.preprocessing import OneHotEncoder
from sklearn.feature_selection import RFECV

# Import modelling data
data_for_model = pickle.load(open("data/customer_loyalty_modelling.p", "rb"))

# Drop unnecessary columns and shuffle data
data_for_model.drop("customer_id", axis=1, inplace=True)
data_for_model = shuffle(data_for_model, random_state=42)
```

## Data Preprocessing

### Handling Missing Values

We check for and remove any rows with missing values:

```python
data_for_model.isna().sum()
data_for_model.dropna(how="any", inplace=True)
```

### Handling Outliers

We investigate the spread of values for each predictor and remove outliers using the interquartile range method:

```python
outlier_columns = ["distance_from_store", "total_sales", "total_items"]

for column in outlier_columns:
    lower_quartile = data_for_model[column].quantile(0.25)
    upper_quartile = data_for_model[column].quantile(0.75)
    iqr = upper_quartile - lower_quartile
    iqr_extended = iqr * 2
    min_border = lower_quartile - iqr_extended
    max_border = upper_quartile + iqr_extended
    
    outliers = data_for_model[(data_for_model[column] < min_border) | (data_for_model[column] > max_border)].index
    print(f"{len(outliers)} outliers detected in column {column}")
    
    data_for_model.drop(outliers, inplace=True)
```

### Splitting Data for Modelling

We split our data into training and test sets:

```python
X = data_for_model.drop(["customer_loyalty_score"], axis=1)
y = data_for_model["customer_loyalty_score"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
```

### Encoding Categorical Variables

We use One Hot Encoding for the 'gender' variable:

```python
categorical_vars = ["gender"]
one_hot_encoder = OneHotEncoder(sparse=False, drop="first")

X_train_encoded = one_hot_encoder.fit_transform(X_train[categorical_vars])
X_test_encoded = one_hot_encoder.transform(X_test[categorical_vars])

encoder_feature_names = one_hot_encoder.get_feature_names_out(categorical_vars)

X_train_encoded = pd.DataFrame(X_train_encoded, columns=encoder_feature_names)
X_train = pd.concat([X_train.reset_index(drop=True), X_train_encoded.reset_index(drop=True)], axis=1)
X_train.drop(categorical_vars, axis=1, inplace=True)

X_test_encoded = pd.DataFrame(X_test_encoded, columns=encoder_feature_names)
X_test = pd.concat([X_test.reset_index(drop=True), X_test_encoded.reset_index(drop=True)], axis=1)
X_test.drop(categorical_vars, axis=1, inplace=True)
```

### Feature Selection

We use Recursive Feature Elimination with Cross-Validation (RFECV) to select the most important features:

```python
regressor = LinearRegression()
feature_selector = RFECV(regressor)

fit = feature_selector.fit(X_train, y_train)

optimal_feature_count = feature_selector.n_features_
print(f"Optimal number of features: {optimal_feature_count}")

X_train = X_train.loc[:, feature_selector.get_support()]
X_test = X_test.loc[:, feature_selector.get_support()]
```

## Model Training

We train our Linear Regression model:

```python
regressor = LinearRegression()
regressor.fit(X_train, y_train)
```

## Model Performance Assessment

### Predict on the Test Set

```python
y_pred = regressor.predict(X_test)
```

### Calculate R-Squared

```python
r_squared = r2_score(y_test, y_pred)
print(f"R-squared score: {r_squared}")
```

### Calculate Cross-Validated R-Squared

```python
cv = KFold(n_splits=4, shuffle=True, random_state=42)
cv_scores = cross_val_score(regressor, X_train, y_train, cv=cv, scoring="r2")
print(f"Mean cross-validated R-squared score: {cv_scores.mean()}")
```

### Calculate Adjusted R-Squared

```python
num_data_points, num_input_vars = X_test.shape
adjusted_r_squared = 1 - (1 - r_squared) * (num_data_points - 1) / (num_data_points - num_input_vars - 1)
print(f"Adjusted R-squared score: {adjusted_r_squared}")
```

## Model Summary Statistics

We extract and display the model coefficients:

```python
coefficients = pd.DataFrame(regressor.coef_)
input_variable_names = pd.DataFrame(X_train.columns)
summary_stats = pd.concat([input_variable_names, coefficients], axis=1)
summary_stats.columns = ["input_variable", "coefficient"]
print(summary_stats)
print(f"Intercept: {regressor.intercept_}")
```

This Linear Regression model provides a baseline for predicting customer loyalty scores. In the next steps, we'll explore more advanced models to potentially improve our predictions.
