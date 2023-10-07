import { useEffect, useState } from 'react';
import './modal.scss';

// this is just boilerplate code with the bare minimum of code
// needed for the modal to work, extend any additional props
// and features you need.

// dev note: don't use any custom hooks here

export const Modal = ({
  children,
  closeModal = () => undefined,
  open = false,
}) => {
  if (!open) {
    return null;
  }

  return (
    <div className='modal' style={{ display: open ? 'block' : 'none' }}>
      <div className={'modal-bg'}></div>
      <div className={'modal-body'}>
        {children}
      </div>
    </div>
  );
};

export const useModal = (props) => {
  const [open, setOpen] = useState(false);

  const localOnClose = () => {
    if (typeof props?.onClose !== 'undefined') {
      props?.onClose();
    }
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (open) {
        document.body.classList.add('disable-scroll');
      } else {
        document.body.classList.remove('disable-scroll');
      }
    }

    return () => {
      typeof document !== 'undefined' &&
        document.body.classList.remove('disable-scroll');
    };
  }, [open]);

  const closeModal = () => {
    localOnClose();
    setOpen(false);
  };

  const openModal = () => {
    setOpen(true);
  };

  const toggleModal = () => {
    if (open === true) {
      localOnClose();
    }
    setOpen(!open);
  };

  const modalProps = {
    open,
    closeModal,
  };

  return { closeModal, openModal, toggleModal, modalProps };
};

// EXAMPLE

// import { Modal, useModal } from '../modal/useModal';

// const Component = () => {
//   const { closeModal, openModal, modalProps } = useModal();

//   return (
//     <div>
//       <Modal
//         {...modalProps}
//       >
//         <MyModalComponent closeCallback={closeModal} />
//       </Modal>
//       <button onClick={openModal}>Open Modal</button>
//     </div>
//   );
// }