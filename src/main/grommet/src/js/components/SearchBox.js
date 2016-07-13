import React, { Component } from 'react';
import Search from 'grommet/components/Search';
import Box from 'grommet/components/Box';
import Anchor from 'grommet/components/Anchor';
import Add from 'grommet/components/icons/base/Add';
import { Link } from 'react-router';

class SearchBox extends Component {


  render () {
    return (
			<Box  focusable={false} align="center" direction="row" justify="end">
			    <Link to="/projects/list/new" >
			        <Anchor tag="span" icon={<Add />} label="Add New" />
			    </Link>
          <Search inline={true} iconAlign="start" placeHolder="Project Name" />
      </Box>
			);
  }
}

export default SearchBox;
