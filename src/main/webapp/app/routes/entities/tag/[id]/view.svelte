<script>
	import { onMount } from 'svelte'
	import { page } from '$app/stores'
	import { goto } from '$app/navigation'
	import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft.js'

	import tagService from '$lib/entities/tag/tag-service.js'
	import Page from '$lib/page/Page.svelte'
	import Record from '$lib/page/Record.svelte'
	import Button from '$lib/Button.svelte'
	import Icon from '$lib/Icon.svelte'

	$: id = $page && $page.params && $page.params.id
	onMount(() => fetchTagDetails())

	let error
	let tag

	function fetchTagDetails() {
		error = undefined
		tagService
			.findById(id)
			.then(res => (tag = res))
			.catch(err => (error = err))
	}
</script>

<svelte:head>
	<title>Tag Details</title>
	<meta name="Description" content="Tag details" />
</svelte:head>
<Page testId="tag" width="full">
	<div class="text-left" slot="header">Tag Details</div>
	{#if tag}
		<div class="mt-4 table table-auto w-full">
			<Record classes="border-t">
				<span slot="label">Name</span>
				<span>{tag.name}</span>
			</Record>
		</div>
	{/if}
	<div class="flex mt-4 flex-row justify-center items-center leading-none">
		<Button name="backBtn" on:click="{() => goto(`/entities/tag`)}">
			<Icon classes="mr-2" icon="{faArrowLeft}" />
			Back
		</Button>
	</div>
</Page>
