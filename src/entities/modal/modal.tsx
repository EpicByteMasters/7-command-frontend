import styles from './modal.module.scss';

import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ModalDesktop } from '@alfalab/core-components/modal/desktop';
import { Button } from '@alfalab/core-components/button';

interface HeaderProps {
	error?: string;
	title?: string;
	paragraph?: string;
	button1?: string;
	button2?: string;
}

export const Modal = ({
	error,
	title,
	paragraph,
	button1,
	button2,
}: HeaderProps) => {
	const navigate = useNavigate();
	const location = useLocation();

	const [open, setOpen] = useState(true);

	const handleOpen = () => setOpen(true);

	const handleClose = () => setOpen(false);

	const handleButton2 = () => {
		setOpen(false);
	};

	const handleButton1 = () => {
		if (location.pathname === '/service-iprs/ipr/1') {
			navigate('/service-iprs/myteam');
		}
		if (location.pathname === '/service-iprs/ipr/2') {
			navigate('/service-iprs/myteam');
		}
		if (location.pathname === '/service-iprs/myteam' && button1 === 'Создать') {
			navigate('/service-iprs/ipr/2');
		}

		// navigate('/', { replace: true });
		setOpen(false);
	};

	return (
		<>
			<ModalDesktop open={open} onClose={handleClose} size={'s'}>
				<ModalDesktop.Header hasCloser={true} sticky={true} title={title} />
				<ModalDesktop.Content>
					{paragraph && <p>{paragraph}</p>}
				</ModalDesktop.Content>
				<ModalDesktop.Footer sticky={true}>
					<ModalDesktop.Controls
						primary={
							button1 && (
								<Button view="primary" size="s" onClick={handleButton1}>
									{button1}
								</Button>
							)
						}
						secondary={
							button2 && (
								<Button view="secondary" size="s" onClick={handleButton2}>
									{button2}
								</Button>
							)
						}
					/>
				</ModalDesktop.Footer>
			</ModalDesktop>
		</>
	);
};
