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
		
		// CALLING FETCH FUNCTION (REACT.JS)	

		fetch('${base}&method=flickr.photos.search&text=${searchQuery}&per_page=10&page=1')
			
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
					React.createElement("input", {type: "text", id: "inputBox", ref: "searchInput", placeholder: "Search Image", value: this.props.query, onChange: this.doSearch}), 
					React.createElement("button", {type: "submit", ref: "button", className: "searchButton"}, "Search on Flickr")
				), 

				React.createElement("div", {className: "verticalCenter"}, 
          				!photos.length &&
           				 React.createElement("p", null, "No photos!"), 
          				
          				React.createElement("div", null, 
          					this.state.photos.map(function(item,i){
          						return (
          							React.createElement("view", null, 
          								React.createElement(Image, {
          									source: item}
          								)
          							)
          						);
          					},this)
          				)
          				
        		)
				
			)

			)
	}

  });

  React.render(React.createElement(SearchBox, null), document.body);