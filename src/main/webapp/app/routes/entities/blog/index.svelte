<script>
	import { onMount } from 'svelte'
	import { goto } from '$app/navigation'
	import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus.js'

	import blogService from '$lib/entities/blog/blog-service.js'
	import Page from '$lib/page/Page.svelte'
	import Button from '$lib/Button.svelte'
	import Icon from '$lib/Icon.svelte'
	import BlogTable from '$lib/entities/blog/BlogTable.svelte'
	import BlogDeleteModal from '$lib/entities/blog/BlogDeleteModal.svelte'

	let error
	let blogs = []
	let loading = true
	let showDeleteModal = false
	let blogId = null

	onMount(() => fetchBlogs())

	function fetchBlogs() {
		loading = true
		error = undefined
		blogService
			.findAll()
			.then(res => {
				blogs = res
			})
			.catch(err => (error = err))
			.finally((loading = false))
	}

	function viewBlog(event) {
		goto(`/entities/blog/${event.detail.id}/view`)
	}

	function updateBlog(event) {
		goto(`/entities/blog/${event.detail.id}/edit`)
	}

	function showDeleteBlogModal(event) {
		blogId = event.detail.id
		showDeleteModal = true
	}

	function closeDeleteBlogModal() {
		showDeleteModal = false
		blogId = null
	}

	function deleteBlog(event) {
		blogService
			.delete(blogId)
			.then(() => fetchBlogs())
			.catch(err => (error = err))
			.finally(() => (showDeleteModal = false), (blogId = null))
	}
</script>

<svelte:head>
	<title>Blogs</title>
	<meta name="Description" content="Blog list" />
</svelte:head>

<Page testId="blog" width="full">
	<div
		class="text-left flex flex-row justify-between items-center"
		slot="header"
	>
		<span>Blogs</span>
		<div class="flex flex-row justify-end text-base">
			<Button
				classes="sm:my-0"
				disabled="disabled"
				on:click="{() => goto(`/entities/blog/new`)}"
			>
				<Icon classes="mr-2" icon="{faPlus}" />
				Create Blog
			</Button>
		</div>
	</div>
	{#if showDeleteModal}
		<BlogDeleteModal
			id="{blogId}"
			on:close="{closeDeleteBlogModal}"
			on:deleteBlog="{deleteBlog}"
		/>
	{/if}
	<div
		class="flex flex-row justify-between items-center text-base mt-4"
	></div>
	{#if !loading}
		<BlogTable
			blogs="{blogs}"
			on:updateblog="{updateBlog}"
			on:viewblog="{viewBlog}"
			on:deleteblog="{showDeleteBlogModal}"
		/>
	{/if}
</Page>
