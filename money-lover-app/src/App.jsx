import { useState } from 'react'
import AppLayout from './components/Layout/AppLayout'
import { Button, Input, Card, CardHeader, CardContent, Modal, ConfirmModal, Loading } from './components/UI'
import { ExpenseForm, AmountInput, CategorySelector } from './components/Forms'

function App() {
  const [currentPage, setCurrentPage] = useState('expenses')
  const [dailyTotal] = useState(45.75) // Mock daily total for demo
  const [modalOpen, setModalOpen] = useState(false)
  const [confirmModal, setConfirmModal] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleLoadingDemo = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  const renderPageContent = () => {
    switch (currentPage) {
      case 'expenses':
        return (
          <div className="space-y-6">
            {/* Expense Form Demo */}
            <ExpenseForm
              onSubmit={(expenseData) => {
                console.log('Expense submitted:', expenseData);
                alert(`Expense saved: $${expenseData.amount} for ${expenseData.category.name}`);
              }}
            />
          </div>
        )
      case 'list':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader className="text-xl font-bold text-gray-900 mb-4">
                UI Components Demo
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Button Demos */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Buttons</h3>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="primary">Primary</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="success">Success</Button>
                      <Button variant="danger">Danger</Button>
                      <Button variant="ghost">Ghost</Button>
                      <Button loading={loading} onClick={handleLoadingDemo}>
                        {loading ? 'Loading...' : 'Test Loading'}
                      </Button>
                    </div>
                  </div>

                  {/* Modal Demos */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Modals</h3>
                    <div className="flex gap-2">
                      <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
                      <Button variant="danger" onClick={() => setConfirmModal(true)}>Confirm Dialog</Button>
                    </div>
                  </div>

                  {/* Loading Demo */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Loading States</h3>
                    <div className="flex items-center gap-4">
                      <Loading variant="spinner" size="sm" />
                      <Loading variant="dots" size="md" />
                      <Loading variant="pulse" size="lg" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      case 'categories':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader className="text-xl font-bold text-gray-900 mb-4">
                Form Components Demo
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Amount Input Demo */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Amount Input</h3>
                    <AmountInput
                      value={inputValue}
                      onChange={(amount) => setInputValue(amount)}
                    />
                  </div>

                  {/* Category Selector Demo */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Category Selector</h3>
                    <CategorySelector
                      value={null}
                      onChange={(category) => console.log('Selected:', category)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      case 'summary':
        return (
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Summary</h2>
            <p className="text-gray-600">This page will show expense summaries.</p>
          </div>
        )
      default:
        return <div>Page not found</div>
    }
  }

  return (
    <>
      <AppLayout 
        currentPage={currentPage}
        onPageChange={handlePageChange}
        dailyTotal={dailyTotal}
      >
        {renderPageContent()}
      </AppLayout>

      {/* Demo Modals */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="UI Component Demo"
        footer={
          <div className="flex justify-end space-x-2">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setModalOpen(false)}>
              Close
            </Button>
          </div>
        }
      >
        <p className="text-gray-600">
          This is a demo modal showcasing the Modal component with proper focus management, 
          accessibility features, and responsive design.
        </p>
      </Modal>

      <ConfirmModal
        isOpen={confirmModal}
        onClose={() => setConfirmModal(false)}
        onConfirm={() => console.log('Confirmed!')}
        message="Are you sure you want to perform this action? This action cannot be undone."
        variant="danger"
        confirmText="Delete"
      />
    </>
  )
}

export default App
