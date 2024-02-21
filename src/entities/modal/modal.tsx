//--------------------------------------------------------------
import { useState } from 'react';
//---------------------------------------------------------------
import { ModalDesktop } from '@alfalab/core-components/modal/desktop';
import { Button } from '@alfalab/core-components/button';

import styles from './modal.module.scss';

interface ModalProps {
  error?: string;
  title?: string;
  paragraph?: string;
  confirmButtonLabel?: string;
  cancelButtonLabel?: string;
  onConfirm?: (id?: number) => void;
  onCancel?: () => void;
}

export const Modal = ({
  error,
  title,
  paragraph,
  confirmButtonLabel,
  cancelButtonLabel,
  onConfirm,
  onCancel
}: ModalProps) => {
  const [open, setOpen] = useState(true);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleCancelButton = () => {
    if (onCancel) {
      onCancel();
    }
    setOpen(false);
  };

  const handleConfirmButton = () => {
    if (onConfirm) {
      onConfirm();
    }
    setOpen(false);
  };

  return (
    <>
      <ModalDesktop open={open} onClose={handleClose} size={'s'}>
        <ModalDesktop.Header align={'center'} hasCloser={true} sticky={true} title={title} />
        <ModalDesktop.Content className={styles.modalContent}>{paragraph && <p>{paragraph}</p>}</ModalDesktop.Content>
        <ModalDesktop.Footer sticky={true}>
          <ModalDesktop.Controls
            layout={'center'}
            gap={24}
            primary={
              confirmButtonLabel && (
                <Button view="primary" size="s" onClick={handleConfirmButton}>
                  {confirmButtonLabel}
                </Button>
              )
            }
            secondary={
              cancelButtonLabel && (
                <Button view="secondary" size="s" onClick={handleCancelButton}>
                  {cancelButtonLabel}
                </Button>
              )
            }
          />
        </ModalDesktop.Footer>
      </ModalDesktop>
    </>
  );
};
