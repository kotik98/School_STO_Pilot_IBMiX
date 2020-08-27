import React, { Component } from 'react';
import { Select } from 'antd';

const { Option } = Select;


function SelectCitys() {
    return (
        <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select your town"
            optionFilterProp="children"
        >
            <Option value="Москва">Москва</Option>
            <Option value="Санкт-Петербург">Санкт-Петербург</Option>
            <Option value="Самара">Самара</Option>
            <Option value="Казань">Казань</Option>
            <Option value="Ростов">Ростов</Option>
            <Option value="Краснодар">Краснодар</Option>
        </Select>
    );
}


export default SelectCitys;