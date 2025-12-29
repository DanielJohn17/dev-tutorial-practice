# Decision Tree: Titanic Survival (Exercise)

A minimal, reproducible notebook exercise that trains a Decision Tree classifier to predict Titanic passenger survival using `scikit-learn`. It covers basic preprocessing for categorical and numeric features and evaluates the model on a hold-out set.

## Project Structure
- `decision_tree/exercise/decision_tree_exercise.ipynb` — main notebook
- `decision_tree/exercise/titanic.csv` — dataset (local CSV)

## Environment & Installation
You already have a virtual environment in this repo: `ai-venv/` (Python 3.13). Activate it before running Jupyter.

Linux/macOS:
```bash
source ai-venv/bin/activate
python --version
```

If you need to (re)install the required packages inside the venv:
```bash
pip install --upgrade pip
pip install jupyter pandas scikit-learn numpy
```

If `ai-venv` is missing, create it first:
```bash
python -m venv ai-venv
source ai-venv/bin/activate
pip install --upgrade pip
pip install jupyter pandas scikit-learn numpy
```

## Run the Notebook
1. Activate the venv (see above).
2. Launch Jupyter Lab or Notebook from the repo root:
   ```bash
   jupyter lab
   # or
   jupyter notebook
   ```
3. Open `decision_tree/exercise/decision_tree_exercise.ipynb`.
4. Run cells top-to-bottom:
   - Load data and preview
   - Build features (`inputs_n`) and `target`
   - Split train/test
   - Train `DecisionTreeClassifier`
   - Evaluate with `model.score(X_test, y_test)`
   - Predict samples, e.g. `model.predict(X_test.iloc[0:5])`

## Feature Engineering Summary
- Categorical columns (`Name`, `Sex`, `Ticket`, `Cabin`, `Embarked`):
  - Filled missing values with the string `"Unknown"`.
  - Encoded with `LabelEncoder` per-column to create `*_n` features.
- Numeric column (`Age`):
  - Kept numeric; imputed missing values with the column median and stored as `age_n`.
- Final feature matrix `inputs_n` is created by dropping the original mixed-type columns and keeping only engineered numeric columns.

## Model
- Algorithm: `sklearn.tree.DecisionTreeClassifier()` (default hyperparameters)
- Split: `train_test_split(..., test_size=0.20, random_state=42)`
- Metrics: simple accuracy via `model.score(X_test, y_test)`

## Troubleshooting
- File not found for CSV: ensure you start Jupyter from the repo root and that the working directory contains `decision_tree/exercise/titanic.csv`. If needed, update the path in the notebook to the correct CSV location.
- Missing packages: activate the venv and install (see Environment section).
- Kernel mismatch: in Jupyter, select the `ai-venv` Python kernel.

## Next Steps
- Tune tree depth/criteria (`max_depth`, `min_samples_split`) and compare results.
- Try `OneHotEncoder` + `ColumnTransformer` for categorical handling.
- Add cross-validation and metrics beyond accuracy (precision/recall/ROC-AUC).
