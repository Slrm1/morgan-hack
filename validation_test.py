import unittest
import numpy as np
import torch
import sys
import os

# Add the parent directory to the path so we can import our modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from quantum_models import ClimatePredictor


class TestClimateModel(unittest.TestCase):
    def setUp(self):
        """Set up test fixtures"""
        self.input_size = 10
        self.model = ClimatePredictor(input_size=self.input_size)

        # Create dummy test data
        self.test_data = torch.rand(100, self.input_size)  # 100 samples with 10 features each
        self.labels = torch.rand(100, 4)  # 100 samples with 4 output values each

    def test_model_initialization(self):
        """Test that the model initializes correctly"""
        self.assertIsNotNone(self.model)
        self.assertEqual(self.model.input_size, self.input_size)

    def test_model_forward_pass(self):
        """Test that the model can perform a forward pass"""
        output = self.model(self.test_data)
        self.assertEqual(output.shape, (100, 4))  # Output should have shape [batch_size, 4]

    def test_climate_model_accuracy(self):
        """Test the accuracy of the climate model predictions"""
        predictions = self.model(self.test_data)

        # Convert to numpy for accuracy calculation
        predictions_np = predictions.detach().numpy()
        labels_np = self.labels.numpy()

        # Calculate mean absolute error
        mae = np.mean(np.abs(predictions_np - labels_np))

        # Check if MAE is below threshold
        print(f"Model MAE: {mae}")
        self.assertLess(mae, 1.5, "Mean absolute error exceeds threshold")

    def test_model_predict_method(self):
        """Test the model's predict method"""
        predictions = self.model.predict(self.test_data)
        self.assertEqual(predictions.shape, (100, 4))


def load_dataset(dataset_name):
    """
    Mock function to load a test dataset
    In a real application, this would load actual climate data
    """
    if dataset_name == "climate_test":
        # Create mock dataset with features and labels
        class MockDataset:
            def __init__(self):
                self.features = torch.rand(100, 10)
                self.labels = torch.rand(100, 4)

        return MockDataset()
    else:
        raise ValueError(f"Unknown dataset: {dataset_name}")


def mean_absolute_error(labels, predictions):
    """Calculate mean absolute error between labels and predictions"""
    return np.mean(np.abs(labels - predictions))


if __name__ == "__main__":
    unittest.main()