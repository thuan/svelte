<script>
	import { onMount } from 'svelte'
	import { goto } from '$app/navigation'
	import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus.js'

	import tagService from '$lib/entities/tag/tag-service.js'
	import Page from '$lib/page/Page.svelte'
	import Button from '$lib/Button.svelte'
	import Icon from '$lib/Icon.svelte'
	import Pagination from '$lib/table/Pagination.svelte'
	import TagTable from '$lib/entities/tag/TagTable.svelte'
	import TagDeleteModal from '$lib/entities/tag/TagDeleteModal.svelte'

	let error
	let tags = []
	let sortPredicate = 'id'
	let sortOrder = 'asc'
	let pageSize = 15
	let page = 1
	let totalCount = 0
	let loading = true
	let showDeleteModal = false
	let tagId = null

	onMount(() => fetchTags())

	function fetchTags() {
		loading = true
		error = undefined
		tagService
			.findAll(page, pageSize, sortPredicate, sortOrder)
			.then(res => {
				tags = res.data
				totalCount = res.totalCount
			})
			.catch(err => (error = err))
			.finally((loading = false))
	}

	function viewTag(event) {
		goto(`/entities/tag/${event.detail.id}/view`)
	}

	function updateTag(event) {
		goto(`/entities/tag/${event.detail.id}/edit`)
	}

	function showDeleteTagModal(event) {
		tagId = event.detail.id
		showDeleteModal = true
	}

	function closeDeleteTagModal() {
		showDeleteModal = false
		tagId = null
	}

	function deleteTag(event) {
		tagService
			.delete(tagId)
			.then(() => fetchTags())
			.catch(err => (error = err))
			.finally(() => (showDeleteModal = false), (tagId = null))
	}

	function sortByPredicate(event) {
		sortPredicate = event.detail.sortPredicate
		sortOrder = event.detail.sortOrder
		fetchTags()
	}

	function handlePageChange(event) {
		page = event.detail.page
		fetchTags()
	}
</script>

<svelte:head>
	<title>Tags</title>
	<meta name="Description" content="Tag list" />
</svelte:head>

<Page testId="tag" width="full">
	<div
		class="text-left flex flex-row justify-between items-center"
		slot="header"
	>
		<span>Tags</span>
		<div class="flex flex-row justify-end text-base">
			<Button
				classes="sm:my-0"
				disabled="disabled"
				on:click="{() => goto(`/entities/tag/new`)}"
			>
				<Icon classes="mr-2" icon="{faPlus}" />
				Create Tag
			</Button>
		</div>
	</div>
	{#if showDeleteModal}
		<TagDeleteModal
			id="{tagId}"
			on:close="{closeDeleteTagModal}"
			on:deleteTag="{deleteTag}"
		/>
	{/if}
	<div class="flex flex-row justify-between items-center text-base mt-4">
		<Pagination
			totalCount="{totalCount}"
			pageSize="{pageSize}"
			page="{page}"
			classes="my-2"
			on:pagechange="{handlePageChange}"
		/>
	</div>
	{#if !loading}
		<TagTable
			tags="{tags}"
			sortPredicate="{sortPredicate}"
			on:sortbypredicate="{sortByPredicate}"
			on:updatetag="{updateTag}"
			on:viewtag="{viewTag}"
			on:deletetag="{showDeleteTagModal}"
		/>
	{/if}
	<Pagination
		totalCount="{totalCount}"
		pageSize="{pageSize}"
		page="{page}"
		classes="mt-4"
		on:pagechange="{handlePageChange}"
	/>
</Page>
