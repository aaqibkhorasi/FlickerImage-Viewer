

const key = '683bab08f2d5eff39ac18920e7633776';
const base = 'https://api.flickr.com/services/rest/?api_key=683bab08f2d5eff39ac18920e7633776&format=rest&format=json&nojsoncallback=1';
//var xhr = new XMLHttpRequest({mozSystem: true});
var SearchBox = React.createClass({displayName: "SearchBox",


	getInitialState: function(){
		return {
			photos : [],
			selectedValue : 'date-posted-desc',
			enLarge : 'false' 
		}

	},
	doSearch:function(e){
		e.preventDefault();  // to prevent post behaviour of a submit button
		var searchQuery= this.refs.searchInput.getDOMNode().value;  // this is the search text value 
		var sVal = this.state.selectedValue; 
		//this.props.doSearch(searchQuery);
		console.log("hello inside doSearch");
		console.log("STATE OF SELECTED VALUE: "+sVal);
		console.log(searchQuery);
		
		//let url = `https://api.flickr.com/services/rest/?api_key=${key}&method=flickr.photos.search&format=json&nojsoncallback=1&&per_page=50&page=1&text=${searchQuery}`;
		

		// JQUERY CALL BACK FUNCTION
		$.get(`${base}&method=flickr.photos.search&text=${searchQuery}&sort=${sVal}&per_page=12&page=1`, function(data){
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
	handleSelect: function(e){
		this.setState({selectedValue: e.target.value});
	},

	enLargeThumb: function(){
		this.setState({enLarge:'true'});
	},
	render:function(){
		var { photos } = this.state;
		var imgClicked = this.state.enLarge; 
		console.log("Helo");
		console.log(this.state.photos);
		var message = 'you selected ' + this.state.selectedValue;
		var messageImg= 'you clicked : '+ this.state.enLarge;
		return(
			React.createElement("div", {className: ""}, 

				React.createElement("form", {onSubmit: this.doSearch}, 
					React.createElement("input", {type: "text", id: "inputBox", ref: "searchInput", placeholder: "Search Image", value: this.props.query}), 
					React.createElement("button", {type: "submit", ref: "button", className: "searchButton"}, "Search on Flickr")
				), 
				React.createElement("select", {value: this.state.selectedValue, onChange: this.handleSelect}, 
					React.createElement("option", {value: "date-posted-asc"}, "sort by date(Ascending)"), 
					React.createElement("option", {value: "date-posted-desc"}, "sort by date(Descending)")
				), 
				React.createElement("p", null, " ", message, " "), 
				React.createElement("p", null, " ", messageImg, " "), 

				React.createElement("div", {className: "verticalCenter"}, 
          				!photos.length &&
           				 React.createElement("p", null, "No photos!"), 
          				
          				React.createElement("div", null, 
          					this.state.photos.map(function(item,i){
          						return (
          							
          							React.createElement("a", {href: item}, 
          								React.createElement("img", {src: item, height: "100", width: "250", 
          								onClick: this.enLargeThumb})
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