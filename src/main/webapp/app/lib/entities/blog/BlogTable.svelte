<script>
	import BlogListActions from '$lib/entities/blog/BlogListActions.svelte'
	import Sort from '$lib/table/Sort.svelte'
	import Table from '$lib/table/Table.svelte'
	import TableData from '$lib/table/TableData.svelte'
	import TableHeader from '$lib/table/TableHeader.svelte'
	import TableRow from '$lib/table/TableRow.svelte'

	export let blogs = []
</script>

<Table testId="blog">
	<thead slot="head">
		<TableRow classes="bg-gray-100 dark:bg-gray-700">
			<TableHeader>
				<span>ID</span>
			</TableHeader>
			<TableHeader>
				<span>Name</span>
			</TableHeader>
			<TableHeader>
				<span>Handle</span>
			</TableHeader>
			<TableHeader />
		</TableRow>
	</thead>
	<tbody>
		{#each blogs as blog (blog.id)}
			<TableRow let:showActions>
				<TableData>{blog.id}</TableData>
				<TableData>{blog.name}</TableData>
				<TableData>{blog.handle}</TableData>
				<TableData classes="w-48 {showActions ? 'sm:py-0' : ''}">
					<div class:hidden="{showActions}">&nbsp;</div>
					<BlogListActions
						blog="{blog}"
						showActions="{showActions}"
						on:viewblog
						on:updateblog
						on:deleteblog
					/>
				</TableData>
			</TableRow>
		{:else}
			<TableRow let:showActions>
				<TableData colspan="3" classes="text-center py-8"
					>No Blogs found</TableData
				>
			</TableRow>
		{/each}
	</tbody>
</Table>
