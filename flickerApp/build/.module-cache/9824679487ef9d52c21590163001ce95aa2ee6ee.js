// var HelloWorld = React.createClass({
//             render: function() {
//                 return <div>
//                     <h1>Hello World</h1>
//                     <p>This is some text</p>
//                 </div>
//             }
//         });
//   //React.render(<HelloWorld />, document.body);

//import Superagent from 'superagent';

const key = '683bab08f2d5eff39ac18920e7633776';
const base = 'https://api.flickr.com/services/rest/?api_key=683bab08f2d5eff39ac18920e7633776&format=rest&format=json&nojsoncallback=1';
//var xhr = new XMLHttpRequest({mozSystem: true});
var SearchBox = React.createClass({displayName: "SearchBox",


	getInitialState: function(){
		return {
			photos : []
		}

	},
	doSearch:function(){
		var searchQuery= this.refs.searchInput.getDOMNode().value;  // this is the search text value 
		//this.props.doSearch(searchQuery);
		console.log("hello inside doSearch");
		console.log(searchQuery);
		//let url = `https://api.flickr.com/services/rest/?api_key=${key}&method=flickr.photos.search&format=json&nojsoncallback=1&&per_page=50&page=1&text=${searchQuery}`;
		
			
		// JQUERY CALL BACK FUNCTION
		$.get(`${base}&method=flickr.photos.search&text=${searchQuery}&per_page=10&page=1`, function(data){
			  console.log("inside Callback");
			  console.log(data.photos);
			  this.setState({
			  		photos : data.photos.photo.map(function(photo,i){
			  			if (photo){
			  				let id = photo.id ; 
			  				let source = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
			  				return source; 			  			}
			  		})
			  });
			
		}.bind(this));

		
	},

	render:function(){
		var { photos } = this.state;
		console.log("Helo");
		console.log(this.state.photos);
		return(
			React.createElement("div", {className: ""}, 

				React.createElement("form", {onSubmit: this.doSearch}, 
					React.createElement("input", {type: "text", ref: "searchInput", placeholder: "Search Image", value: this.props.query}), 
					React.createElement("button", {type: "submit", ref: "button", className: "searchButton"}, "Search on Flickr")
				), 

				React.createElement("div", {className: "verticalCenter"}, 
          				!photos.length &&
           				 React.createElement("p", null, "No photos!"), 
          				
          				!!photos.length &&
          					React.createElement("img", {src: this.state.photos[0]})
          					&&
          					React.createElement("img", {src: this.state.photos[1]})
          				
        		)
				
			)

			)
	}

  });

  React.render(React.createElement(SearchBox, null), document.body);