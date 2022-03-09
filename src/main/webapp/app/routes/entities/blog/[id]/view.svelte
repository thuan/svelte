<script>
	import { onMount } from 'svelte'
	import { page } from '$app/stores'
	import { goto } from '$app/navigation'
	import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft.js'

	import blogService from '$lib/entities/blog/blog-service.js'
	import Page from '$lib/page/Page.svelte'
	import Record from '$lib/page/Record.svelte'
	import Button from '$lib/Button.svelte'
	import Icon from '$lib/Icon.svelte'

	$: id = $page && $page.params && $page.params.id
	onMount(() => fetchBlogDetails())

	let error
	let blog

	function fetchBlogDetails() {
		error = undefined
		blogService
			.findById(id)
			.then(res => (blog = res))
			.catch(err => (error = err))
	}
</script>

<svelte:head>
	<title>Blog Details</title>
	<meta name="Description" content="Blog details" />
</svelte:head>
<Page testId="blog" width="full">
	<div class="text-left" slot="header">Blog Details</div>
	{#if blog}
		<div class="mt-4 table table-auto w-full">
			<Record classes="border-t">
				<span slot="label">Name</span>
				<span>{blog.name}</span>
			</Record>
			<Record>
				<span slot="label">Handle</span>
				<span>{blog.handle}</span>
			</Record>
		</div>
	{/if}
	<div class="flex mt-4 flex-row justify-center items-center leading-none">
		<Button name="backBtn" on:click="{() => goto(`/entities/blog`)}">
			<Icon classes="mr-2" icon="{faArrowLeft}" />
			Back
		</Button>
	</div>
</Page>
