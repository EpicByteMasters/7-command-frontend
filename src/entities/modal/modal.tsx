import styles from './modal.module.scss';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

	const [open, setOpen] = useState(true);
	const [logOut, setLogOut] = useState(false);

	const handleOpen = () => setOpen(true);

	const handleClose = () => setOpen(false);

	const handleLogIn = () => {
		setOpen(false);
		setLogOut(false);
	};

	const handleLogOut = () => {
		navigate('/', { replace: true });
		setOpen(false);
		setLogOut(true);
	};

	return (
		<>
			<ModalDesktop open={open} onClose={handleClose} size={'s'}>
				<ModalDesktop.Header hasCloser={true} sticky={true} title={title} />
				<ModalDesktop.Content>
					<p>{paragraph}</p>
				</ModalDesktop.Content>
				<ModalDesktop.Footer sticky={true}>
					<ModalDesktop.Controls
						primary={
							<Button view="primary" size="s" onClick={handleLogOut}>
								{button1}
							</Button>
						}
						secondary={
							<Button view="secondary" size="s" onClick={handleLogIn}>
								{button2}
							</Button>
						}
					/>
				</ModalDesktop.Footer>
			</ModalDesktop>
		</>
	);
};
