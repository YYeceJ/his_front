import React from "react";
import {
    Button,
    Divider,
    Popconfirm,
    Table,
    Form,
    Modal,
    Input,
    Select,
    Col,
    Row, Spin, DatePicker
} from 'antd';
import {connect} from 'react-redux';
import {queryPatientInfo} from './actions';
import {RouteComponentProps} from 'react-router-dom';
import {FormComponentProps} from "antd/lib/form";

const FormItem = Form.Item;
const {Option} = Select;

interface PatientInfoManagementOwnProps extends RouteComponentProps<any>, FormComponentProps {
}

interface PatientInfoManagementStateProps {
    loading?: any,
    patientInfoList?: any,
}

interface PatientInfoManagementDispatchProps {
    queryPatientInfo?: Function,
}

interface PatientInfoManagementState {
}

@(connect(
    (state: any) => (
        {
            loading: state.patientInfoManagementReducer.loading,
            patientInfoList: state.patientInfoManagementReducer.patientInfoList
        }
    ),
    (dispatch: any) => (
        {
            queryPatientInfo: (param: any) => {
                dispatch(queryPatientInfo(param));
            }
        }
    )
) as any)
class PatientInfoManagement extends React.Component<PatientInfoManagementStateProps & PatientInfoManagementDispatchProps & PatientInfoManagementOwnProps, PatientInfoManagementState> {

    constructor(props: PatientInfoManagementStateProps & PatientInfoManagementDispatchProps & PatientInfoManagementOwnProps) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.queryPatientInfo({
            patientname:""
        });
    }

    handleSearch = () => {
        const patientName: any = this.props.form.getFieldsValue().patientName || "";
        this.props.queryPatientInfo({
            patientname:patientName
        });
    }

    render() {
        const {patientInfoList, form, loading} = this.props;
        const columns = [
            {
                title: '姓名',
                dataIndex: 'patientname',
            },
            {
                title: '性别',
                dataIndex: 'gender',
                render: (text: any) => (<span>{text === 1 ? "女" : "男"}</span>)
            },
            {
                title: '出生日期',
                dataIndex: 'birthdate',
            },
            {
                title: '电话',
                dataIndex: 'phone',
            }
        ];

        const formLayout = {
            labelCol: {
                span: 5,
            },
            wrapperCol: {
                span: 15,
            },
        };

        return (
            <Spin spinning={loading}>
                <Form style={{marginTop: 20, marginBottom: 20}}>
                    <Row>
                        <Col span={6}>
                            <FormItem key="patientName" {...formLayout} label="患者姓名">
                                {form.getFieldDecorator('patientName', {})(
                                    <Input/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <Button type={"primary"} onClick={this.handleSearch}>查询</Button>
                        </Col>
                    </Row>
                </Form>
                <Table dataSource={patientInfoList} columns={columns}/>;
            </Spin>

        );
    }
}

export const PatientInfoManagementForm = Form.create()(PatientInfoManagement);