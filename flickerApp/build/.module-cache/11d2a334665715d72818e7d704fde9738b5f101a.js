// var HelloWorld = React.createClass({
//             render: function() {
//                 return <div>
//                     <h1>Hello World</h1>
//                     <p>This is some text</p>
//                 </div>
//             }
//         });
//   //React.render(<HelloWorld />, document.body);

var SearchBox = React.createClass({displayName: "SearchBox",
	doSearch:function(){
		var query= this.refs.searchInput.getDOMNode().value;  // this is the search text value 
		this.props.doSearch(query);
	},
	render:function(){
		return React.createElement("input", {type: "text", ref: "searchInput", placeholder: "Search Name", value: this.props.query, onChange: this.doSearch})
	}

  });

  React.render(React.createElement(SearchBox, null), document.body);