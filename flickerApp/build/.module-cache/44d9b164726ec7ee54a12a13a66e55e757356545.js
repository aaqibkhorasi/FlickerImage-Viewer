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
		
		// fetch(url)
		//   .then(response => response.json())
		//   .then(data=>{
		//   	this.props._getPhotos(data.photos.photo);
		//   })
		//   .catch(error=>{
		//   	 throw error;
		//   });	
		// JQUERY CALL BACK FUNCTION
		$.get(`${base}&method=flickr.photos.search&text=${searchQuery}&per_page=10&page=1`, function(data){
			  console.log("inside Callback");
			  console.log(data.photos);
			  
			 // console.log(data.body.photos.photo);
			  // $.fail(function() {
    	// 		alert( "error" );
  			//    })
			//console.log(data.body.photos.photo);

				 // this.setState({
				 // 		photos: data.photos.map(function(photo){
				 // 				// if(photo){
				 // 				// 	console.log("HURRAH");
				 // 				// }
				 // 		});

     //         			//photos: data.body.photos.photo.map(this.getFlickrPhotoUrl)
     //       		});
			
			// if (data.status == 200 data.body.photos){
			// 	this.setState({
   //          			photos: res.body.photos.photo.map(this.getFlickrPhotoUrl)
   //        		});
				
		});

		//Superagent
			// .get(`${base}&method=flickr.photos.search&text=${searchQuery}&per_page=10&page=1`, res =>{
			// 	if (res.status === 200 && res.body.photos)
   //        			this.setState({
   //          			photos: res.body.photos.photo.map(this.getFlickrPhotoUrl)
   //        		});
			// });	
	
	},
	getFlickrPhotoUrl:function(image){
		return `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`;
	},

	render:function(){
		var { photos } = this.state;
		console.log("Helo");
		console.log(this.state.photos);
		return(
			React.createElement("div", {className: ""}, 

				React.createElement("form", {onSubmit: this.doSearch}, 
					React.createElement("input", {type: "text", ref: "searchInput", placeholder: "Search Image", value: this.props.query, onChange: this.doSearch}), 
					React.createElement("button", {type: "submit", ref: "button", className: "searchButton"}, "Search on Flickr"), 

					React.createElement("div", {className: "verticalCenter"}, 
          				!photos.length &&
           				 React.createElement("p", null, "No photos!"), 
          				
          				!!photos.length &&
          					React.createElement("p", null, " photos loaded! ")
          				
        			)
				)
			)

			)
		//return <input type="text" ref="searchInput" placeholder="Search Image" value={this.props.query} onChange={this.doSearch}/>
	}

  });

  React.render(React.createElement(SearchBox, null), document.body);