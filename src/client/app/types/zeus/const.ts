/* eslint-disable */

export const AllTypesProps: Record<string,any> = {
	DateTime: "String",
	Mutation:{
		createNote:{
			alias:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:true
			},
		}
	}
}

export const ReturnTypes: Record<string,any> = {
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
	Note:{
		id:"Float",
		alias:"String",
		user:"User",
		created_at:"DateTime",
		updated_at:"DateTime"
	},
	Query:{
		users:"User",
		whoAmI:"User",
		notes:"Note"
	},
	Mutation:{
		createNote:"Note"
	}
}