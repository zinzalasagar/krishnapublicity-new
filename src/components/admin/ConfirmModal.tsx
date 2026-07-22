import React from 'react';
import Modal from '../Modal';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="flex flex-col items-center text-center p-2">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-6 text-red-600">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <p className="text-gray-600 mb-8 text-base leading-relaxed">{message}</p>
        <div className="flex gap-4 w-full justify-center">
          <Button
            variant="outline"
            className="flex-1 max-w-[150px] border-gray-200 hover:bg-gray-50 text-gray-700 hover:text-gray-900 h-12 rounded-xl"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="flex-1 max-w-[150px] bg-red-600 hover:bg-red-700 text-white h-12 rounded-xl border-none shadow-md"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
