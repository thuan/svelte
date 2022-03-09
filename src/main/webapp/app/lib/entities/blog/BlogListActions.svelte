<script>
	import { createEventDispatcher } from 'svelte'
	import { faEye } from '@fortawesome/free-solid-svg-icons/faEye.js'
	import { faPencilAlt } from '@fortawesome/free-solid-svg-icons/faPencilAlt.js'
	import { faTrashAlt } from '@fortawesome/free-solid-svg-icons/faTrashAlt.js'

	import Button from '$lib/Button.svelte'
	import Icon from '$lib/Icon.svelte'

	export let blog
	export let showActions = false
	const dispatch = createEventDispatcher()
</script>

<div
	class="flex flex-row justify-center items-center leading-none"
	class:hidden="{!showActions}"
	data-testid="rowactions"
>
	<Button
		name="viewBlogBtn"
		role="action"
		classes="sm:my-0"
		title="View"
		aria-label="view"
		on:click="{() =>
			dispatch('viewblog', {
				id: blog.id,
			})}"
	>
		<Icon icon="{faEye}" />
	</Button>
	<Button
		name="editBlogBtn"
		role="action"
		classes="sm:my-0"
		disabled="disabled"
		title="Edit"
		aria-label="edit"
		on:click="{() =>
			dispatch('updateblog', {
				id: blog.id,
			})}"
	>
		<Icon icon="{faPencilAlt}" />
	</Button>
	<Button
		name="deleteBlogBtn"
		role="action"
		classes="sm:my-0"
		title="Delete"
		aria-label="delete"
		on:click="{() =>
			dispatch('deleteblog', {
				id: blog.id,
			})}"
	>
		<Icon icon="{faTrashAlt}" />
	</Button>
</div>
