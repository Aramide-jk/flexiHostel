import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Wallet, Shield, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function PaymentSetup() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'wallet' | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={() => navigate('/student/dashboard')}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            Payment Setup
          </h1>
          <p className="text-gray-600 mt-2">Set up your payment method for monthly rent</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wallet className="w-8 h-8 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Payment Method</h2>
              <p className="text-gray-600">Select how you'd like to pay your monthly rent</p>
            </div>

            <div className="grid gap-4">
              <label
                className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                  selectedMethod === 'card'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={selectedMethod === 'card'}
                  onChange={(e) => setSelectedMethod(e.target.value as 'card')}
                  className="sr-only"
                />
                <CreditCard className="w-6 h-6 mr-4" />
                <div className="flex-1">
                  <h3 className="font-medium">Credit/Debit Card</h3>
                  <p className="text-sm text-gray-600">Pay with your bank card</p>
                </div>
                <Shield className="w-5 h-5 text-gray-400" />
              </label>

              <label
                className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                  selectedMethod === 'wallet'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="wallet"
                  checked={selectedMethod === 'wallet'}
                  onChange={(e) => setSelectedMethod(e.target.value as 'wallet')}
                  className="sr-only"
                />
                <Wallet className="w-6 h-6 mr-4" />
                <div className="flex-1">
                  <h3 className="font-medium">FlexiHostel Wallet</h3>
                  <p className="text-sm text-gray-600">Top up and pay from your wallet</p>
                </div>
                <Shield className="w-5 h-5 text-gray-400" />
              </label>
            </div>

            {selectedMethod && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-800">Secure Payment</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Your payment information is encrypted and secure. You can change your payment method anytime.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <button
              disabled={!selectedMethod}
              className="w-full bg-emerald-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200"
            >
              Continue Setup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}