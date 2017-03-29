
// Fill in your flicker API key 
const key = '';
const base = 'https://api.flickr.com/services/rest/?api_key=key&format=rest&format=json&nojsoncallback=1';
//var xhr = new XMLHttpRequest({mozSystem: true});
var SearchBox = React.createClass({


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
			<div className="">

				<form onSubmit={this.doSearch}>
					<input type="text" id="inputBox" ref="searchInput" placeholder="Search Image" value={this.props.query} />
					<button type="submit" ref="button" className="searchButton">Search on Flickr</button>
				</form>
				<select value={this.state.selectedValue} onChange={this.handleSelect}>
					<option value="date-posted-asc">sort by date(Ascending)</option>
					<option value="date-posted-desc">sort by date(Descending)</option>
				</select>
				<p> {message} </p>
				<p> {messageImg} </p>

				<div className="verticalCenter">
          				{!photos.length &&
           				 <p>No photos!</p>
          				}
          				<div>
          					{this.state.photos.map(function(item,i){
          						return (
          							
          							<a href={item}>
          								<img src={item} height="100" width="250" 
          								onClick={this.enLargeThumb}/>
          							</a>
          							
          						);
          					},this)}
          				</div>
          				
        		</div>
				
			</div>

			)
	}

  });

  React.render(<SearchBox />, document.body);
