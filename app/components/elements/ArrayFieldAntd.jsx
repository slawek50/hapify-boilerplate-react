import React from 'react';
import PropTypes from 'prop-types';
import Button from 'antd/lib/button';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';

const ArrayFieldAntd = ({
  name, label, addLabel, removable, children,
}) => (
  <Form.List name={name} label={label}>
    {(fields, { add, remove }) => (
      <div>
        {fields.map((field) => (
          <Row key={field.key}>
            <Col>
              {children(field)}
            </Col>
            {removable && (
              <Col>
                <Button onClick={() => remove(field.name)} icon={<CloseOutlined />} />
              </Col>
            )}
          </Row>
        ))}
        <Form.Item>
          <Button type="dashed" onClick={() => add()} block>
            <PlusOutlined />
            {addLabel}
          </Button>
        </Form.Item>
      </div>
    )}
  </Form.List>
);

ArrayFieldAntd.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  addLabel: PropTypes.string.isRequired,
  removable: PropTypes.bool,

  children: PropTypes.func.isRequired,
};

export default ArrayFieldAntd;
