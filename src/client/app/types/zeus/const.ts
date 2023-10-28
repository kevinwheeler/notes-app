/* eslint-disable */

export const AllTypesProps: Record<string,any> = {
	DateTime: `scalar.DateTime` as const,
	Mutation:{
		createNote:{

		},
		deleteNote:{

		},
		updateNote:{

		}
	}
}

export const ReturnTypes: Record<string,any> = {
	Note:{
		id:"Float",
		title:"String",
		content:"String",
		tags:"String",
		user:"User",
		created_at:"DateTime",
		updated_at:"DateTime"
	},
	DateTime: `scalar.DateTime` as const,
	User:{
		id:"Float",
		provider:"String",
		providerId:"String",
		username:"String",
		name:"String",
		notes:"Note",
		created_at:"DateTime",
		updated_at:"DateTime"
	},
	Query:{
		users:"User",
		whoAmI:"User",
		notes:"Note"
	},
	Mutation:{
		createNote:"Note",
		deleteNote:"Boolean",
		updateNote:"Note"
	}
}

export const Ops = {
query: "Query" as const,
	mutation: "Mutation" as const
}