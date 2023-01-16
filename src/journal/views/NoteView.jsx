import {
	DeleteOutline,
	SaveOutlined,
	UploadFileOutlined,
} from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { useForm } from '../../hooks/useForm';
import {
	setActiveNote,
	startSaveNode,
	startUnloadingFiles,
	startDeletingNote,
} from '../../store/journal';
import { ImageGallery } from '../components';

const formData = {
	email: '',
	password: '',
	displayName: '',
};

export const NoteView = () => {
	const {
		active: note,
		messageSaved,
		isSaving,
	} = useSelector(state => state.journal);
	const dispatch = useDispatch();
	const { id, title, body, date, imageUrls, onInputChange, formState } =
		useForm(note);

	const dateString = useMemo(() => {
		const newDate = new Date(date);
		return newDate.toUTCString();
	}, [date]);

	const fileInputRef = useRef();

	useEffect(() => {
		dispatch(setActiveNote(formState));
	}, [formState]);

	useEffect(() => {
		if (messageSaved.length > 0) {
			Swal.fire('Nota actualizada', messageSaved, 'success');
		}
	}, [messageSaved]);

	const onSaveNote = e => {
		e.preventDefault();
		dispatch(startSaveNode());
	};

	const onFileInputChange = ({ target }) => {
		if (target.files === 0) return;

		dispatch(startUnloadingFiles(target.files));
	};

	const onDelete = () => {
		dispatch(startDeletingNote());
	};

	return (
		<Grid
			container
			direction="row"
			justifyContent="space-between"
			alignItems="center"
			sx={{ mb: 1 }}
		>
			<Grid item>
				<Typography fontSize={39} fontWeight="light">
					{dateString}
				</Typography>
			</Grid>
			<Grid item>
				<input
					type="file"
					multiple
					onChange={onFileInputChange}
					style={{ display: 'none' }}
					ref={fileInputRef}
				/>
				<IconButton
					color="primary"
					disabled={isSaving}
					onClick={() => fileInputRef.current.click()}
				>
					<UploadFileOutlined />
				</IconButton>

				<Button
					color="primary"
					sx={{ padding: 2 }}
					onClick={onSaveNote}
					disabled={isSaving}
				>
					<SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
					Guardar
				</Button>
			</Grid>
			<Grid container>
				<TextField
					type="text"
					variant="filled"
					fullWidth
					placeholder="Ingrese un título"
					label="Título"
					name="title"
					value={title}
					onChange={onInputChange}
					sx={{ border: 'none', mb: 1 }}
				/>
				<TextField
					type="text"
					variant="filled"
					fullWidth
					multiline
					placeholder="¿Qué sucedió en el día de hoy?"
					value={body}
					name="body"
					onChange={onInputChange}
					minRows={5}
				/>
			</Grid>

			<Grid container justifyContent="end">
				<Button onClick={onDelete} sx={{ mt: 2 }} color="error">
					<DeleteOutline />
					Borrar
				</Button>
			</Grid>
			{/* Image gallery */}
			<ImageGallery images={note.imageUrls} />
		</Grid>
	);
};
