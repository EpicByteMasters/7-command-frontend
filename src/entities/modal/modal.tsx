import styles from './modal.module.scss';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalDesktop } from '@alfalab/core-components/modal/desktop';
import { Button } from '@alfalab/core-components/button';

interface HeaderProps {
	error?: string;
}
export const Modal = ({ error }: HeaderProps) => {
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
				<ModalDesktop.Header
					hasCloser={true}
					sticky={true}
					title={'Демо-выход'}
				/>
				<ModalDesktop.Content>
					<p>Вы действительно хотите выйти из своего аккаунта?</p>
				</ModalDesktop.Content>
				<ModalDesktop.Footer sticky={true}>
					<ModalDesktop.Controls
						primary={
							<Button view="primary" size="s" onClick={handleLogOut}>
								Да
							</Button>
						}
						secondary={
							<Button view="secondary" size="s" onClick={handleLogIn}>
								Нет
							</Button>
						}
					/>
				</ModalDesktop.Footer>
			</ModalDesktop>
		</>
	);
};
