<script>
	import TagListActions from '$lib/entities/tag/TagListActions.svelte'
	import Sort from '$lib/table/Sort.svelte'
	import Table from '$lib/table/Table.svelte'
	import TableData from '$lib/table/TableData.svelte'
	import TableHeader from '$lib/table/TableHeader.svelte'
	import TableRow from '$lib/table/TableRow.svelte'

	export let tags = []
	export let sortPredicate = 'id'
</script>

<Table testId="tag">
	<thead slot="head">
		<TableRow classes="bg-gray-100 dark:bg-gray-700">
			<TableHeader>
				<span>ID</span>
				<Sort
					active="{sortPredicate === 'id'}"
					sortPredicate="id"
					hasRecords="{tags.length}"
					on:sortbypredicate
				/>
			</TableHeader>
			<TableHeader>
				<span>Name</span>
				<Sort
					active="{sortPredicate === 'name'}"
					sortPredicate="name"
					hasRecords="{tags.length}"
					on:sortbypredicate
				/>
			</TableHeader>
			<TableHeader />
		</TableRow>
	</thead>
	<tbody>
		{#each tags as tag (tag.id)}
			<TableRow let:showActions>
				<TableData>{tag.id}</TableData>
				<TableData>{tag.name}</TableData>
				<TableData classes="w-48 {showActions ? 'sm:py-0' : ''}">
					<div class:hidden="{showActions}">&nbsp;</div>
					<TagListActions
						tag="{tag}"
						showActions="{showActions}"
						on:viewtag
						on:updatetag
						on:deletetag
					/>
				</TableData>
			</TableRow>
		{:else}
			<TableRow let:showActions>
				<TableData colspan="3" classes="text-center py-8"
					>No Tags found</TableData
				>
			</TableRow>
		{/each}
	</tbody>
</Table>
