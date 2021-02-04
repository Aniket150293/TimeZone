import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getCountryList,fetchTime } from '../actions'
import { Input, Form, Button } from "reactstrap";

export default function TimeZone ({getCountryList,countryList,fetchTime,timeReceived}) {
    const [selecedCountry, setSelecedCountry] = useState("");
    const [list, setList] = useState([]);
    const [time, setTime] = useState("NA");

    //To fetch Country List
    React.useEffect(() => {
      getCountryList()
    }, []);

    //Populate Country List
    React.useEffect(() => {
      if(countryList) {
        setList(countryList)
      }
    }, [countryList]);

    //To fetch Time Zone
    React.useEffect(() => {
      if(timeReceived) {
        setTime(timeReceived.formatted)
        
        const timeInterval = setInterval(() => {
          fetchTime(selecedCountry);
        }, 5000);

        return () => clearInterval(timeInterval);
      }
    }, [timeReceived]);

    //To Handle Submit for fetching time
    function handleSubmit(e) {
      e.preventDefault();
      clearInterval();
      setTime('')
      fetchTime(selecedCountry);
    }

     //To Country Change Handling
    function changeCountry(e) {
      setSelecedCountry(e.target.value)
    }

    return (
      <div>
        <Form onSubmit={handleSubmit}>
          <Input
            required
            value={selecedCountry}
            className="form-control-alternative"
            type="select"
            placeholder="country"
            onChange={changeCountry}
          >
            <option value="" >Choose Country</option>
            {list
              ? list.map((item) => (
                <option value={item.zoneName}>{item.countryName}</option>
              )) : "not available"}
          </Input>
          &nbsp;
          <Button color="danger" type="submit" >
            Fetch Time
          </Button>
          <br/>
           Time : {time ? time : ''}
          <br/>
        </Form>
      </div>
   
    );

};

const mapDispatchToProps = {
  getCountryList: getCountryList,
  fetchTime:fetchTime,
};
const mapStateToProps = (state) => ({
  countryList: state.countryList,
  timeReceived: state.time,
});

TimeZone = connect(mapStateToProps, mapDispatchToProps)(TimeZone);
