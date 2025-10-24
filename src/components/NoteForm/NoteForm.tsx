import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from 'formik';
import css from '../NoteForm/NoteForm.module.css'
import * as Yup from "yup";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '../../services/noteService';


interface NoteFormProps{
	onClose: () => void;
}
interface NoteForm{
	title: string;
	content: string;
	tag: Tag;
}
const initialValues: NoteForm={
	title: '',
	content: '',
	tag: 'Todo',
}

type Tag = 'Todo'| 'Work'| 'Personal'| 'Meeting'|'Shopping';
const NotesSchema = Yup.object().shape({
	title: Yup.string()
		.min(3, 'min 3')
		.max (50, 'max 50')
		.required ('Title required'),
	content: Yup.string()
	.max(500, 'max 500'),
	tag: Yup.string()
	.required ('Tag required')
	
})


export default function NoteForm({ onClose }: NoteFormProps) {
	const queryClient = useQueryClient()
	const mutation = useMutation({
		mutationFn: createNote,
		onSuccess: ()=>{
			queryClient.invalidateQueries({queryKey: ['notes']})
			onClose()
		}
		
	})
	const handleSubmit = (values: NoteForm, actions:  FormikHelpers<NoteForm>) =>{
		mutation.mutate(values);
		actions.resetForm();
	}
	

  return (
	<Formik initialValues={initialValues} onSubmit={ handleSubmit} validationSchema={NotesSchema}>
 		 <Form className={css.form}>
  				<div className={css.formGroup}>
   				 <label htmlFor="title">Title</label>
   				 <Field id="title" type="text" name="title" className={css.input} />
    				<ErrorMessage name="title" component="span" className={css.error} />
 				 </div>

 				 <div className={css.formGroup}>
   				 <label htmlFor="content">Content</label>
 					   <Field
						as="textarea"
  					    id="content"
   					name="content"
   				   rows={8}
 					     className={css.textarea}
   				 />
   				 <ErrorMessage name="content" component="span" className={css.error} />
  				</div>

 				   <div className={css.formGroup}>
  					  <label htmlFor="tag">Tag</label>
  					  <Field as='select' id="tag" name="tag" className={css.select}>
  					     <option value="Todo">Todo</option>
  				  		  <option value="Work">Work</option>
  				 		  <option value="Personal">Personal</option>
 		 		  		  <option value="Meeting">Meeting</option>
   				   <option value="Shopping">Shopping</option>
   				 </Field>
   				 <ErrorMessage name="tag" component="span" className={css.error} /> 
 				 </div> 

 				 <div className={css.actions}>
  					  <button type="button" className={css.cancelButton} onClick={onClose}>
  				    Cancel
  					  </button>
  					  <button
  					    type="submit"
  				    className={css.submitButton}
  					    disabled={mutation.isPending}
  					  >Create note</button>
 				 </div>
			</Form>
	</Formik>)
 ;
}
