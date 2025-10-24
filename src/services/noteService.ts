import axios from "axios";

import {type Note } from "../types/note";

interface fetchNotesProps {
	notes: Note[],
	totalPages: number,
}
const myKey: string = import.meta.env.VITE_NOTEHUB_TOKEN;
axios.defaults.baseURL = "https://notehub-public.goit.study/api";
export const fetchNotes = async (searchText: string, page: number): Promise<fetchNotesProps> => {
	
	const {data} = await axios.get<fetchNotesProps>('/notes', {
		params: {
			...(searchText !== "" && { search: searchText }),
			page: page,
			perPage: 10,

		},
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${myKey}`,
		}
	});
	return data ;
};
interface NewNote{
	title: string;
	content: string;
	tag: string;
}

export const createNote = async (newPost: NewNote) => {
	const { data } = await axios.post<Note>('/notes', newPost, {	headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${myKey}`,
		}});
	return data;
};
export const deleteNote = async (postId: string) => {
	const { data } = await axios.delete<Note>(`/notes/${postId}`, {	headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${myKey}`,
		}});
	return data;
};