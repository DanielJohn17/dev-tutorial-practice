# Learn AI Notebooks

A small collection of Jupyter notebooks for practicing basic ML workflows with scikit-learn.

## Contents
- `ai_group_assignment/diabetes_classifier.ipynb` — trains a `DecisionTreeClassifier` on the built-in diabetes dataset (target is binarized at > 130) and reports accuracy plus sample predictions.
- `decision_tree/exercise/decision_tree_exercise.ipynb` — reproducible Titanic survival example using a decision tree and simple label encoding; data lives in `decision_tree/exercise/titanic.csv`.

## Environment
- A ready-to-use virtual environment is checked in at `ai-venv/` (Python 3.13).
- Activate it before running notebooks:
  ```bash
  source ai-venv/bin/activate
  python --version
  ```
- If the venv is missing, create one:
  ```bash
  python -m venv ai-venv
  source ai-venv/bin/activate
  pip install --upgrade pip
  ```

## Install Dependencies
- To match the repo environment: `pip install -r requirements.txt`
- Minimal set (if you prefer lean installs): `pip install jupyter pandas numpy scikit-learn`

## Run the Notebooks
1. Activate the venv.
2. From the repo root, start Jupyter:
   ```bash
   jupyter lab
   # or
   jupyter notebook
   ```
3. Open the notebook you want and run cells top-to-bottom.

## Notes
- For the Titanic notebook, ensure the working directory includes `decision_tree/exercise/titanic.csv` (start Jupyter from the repo root).
- If Jupyter cannot find the kernel, choose the Python from `ai-venv` in the kernel picker.
