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
    Row, Spin, DatePicker, Radio
} from 'antd';
import {connect} from 'react-redux';
import {querySchedule, appointVisit, queryDepartment, queryPatientRecord} from './actions';
import {RouteComponentProps} from 'react-router-dom';
import {FormComponentProps} from "antd/lib/form";
import moment from "moment";
import style from "../DoctorSchedule/style.scss";
import {utils} from "../../utils/utils";

const FormItem = Form.Item;
const {Option} = Select;

interface AppointVisitOwnProps extends RouteComponentProps<any>, FormComponentProps {
}

interface AppointVisitStateProps {
    loading?: any,
    scheduleList?: any,
    departmentList?: any,
    patientRecord?: any,
}

interface AppointVisitDispatchProps {
    querySchedule?: Function,
    appointVisit?: Function,
    queryDepartment?: Function,
    queryPatientRecord?: Function,
}

interface AppointVisitState {
    patientRecordModalVisible?: any
}

@(connect(
    (state: any) => (
        {
            loading: state.appointVisitReducer.loading,
            scheduleList: state.appointVisitReducer.scheduleList,
            departmentList: state.appointVisitReducer.departmentList,
            patientRecord: state.appointVisitReducer.patientRecord,
        }
    ),
    (dispatch: any) => (
        {
            querySchedule: (param: any) => {
                dispatch(querySchedule(param));
            },
            appointVisit: (param: any) => {
                dispatch(appointVisit(param));
            },
            queryDepartment: (param: any) => {
                dispatch(queryDepartment(param));
            },
            queryPatientRecord: (param: any) => {
                dispatch(queryPatientRecord(param));
            }
        }
    )
) as any)
class AppointVisit extends React.Component<AppointVisitStateProps & AppointVisitDispatchProps & AppointVisitOwnProps, AppointVisitState> {

    constructor(props: AppointVisitStateProps & AppointVisitDispatchProps & AppointVisitOwnProps) {
        super(props);
        this.state = {
            patientRecordModalVisible: false
        }
    }

    componentDidMount() {
        this.props.querySchedule({status: 0});
        this.props.queryDepartment();
    }

    handleSearch = () => {
        const values: any = this.props.form.getFieldsValue();
        const param: any = {};
        if (values.doctorname) {
            param.doctorname = values.doctorname;
        }
        if (values.departmentname) {
            param.departmentname = values.departmentname;
        }
        if (values.date) {
            param.date = utils.formatDateTime(values.date);
        }
        this.props.querySchedule({status: 0, ...param});
    }

    queryPatientRecord = () => {
        const userData = JSON.parse(localStorage.getItem("userData"));
        this.props.queryPatientRecord({
            patientid: userData.patientId,
            status: 1
        })
        this.setState({
            patientRecordModalVisible:true
        })
    }

    render() {
        const {loading, form, scheduleList, departmentList, patientRecord} = this.props;
        const userData = JSON.parse(localStorage.getItem("userData"));
        console.log("----userData----", localStorage.getItem("userData"));
        const formLayout = {
            labelCol: {
                span: 5,
            },
            wrapperCol: {
                span: 15,
            },
        };

        const columns = [
            {
                title: '科室',
                dataIndex: 'departmentname',
            },
            {
                title: '诊室',
                dataIndex: 'roomname',
            },
            {
                title: '医生',
                dataIndex: 'doctorname',
            },
            {
                title: '挂号费',
                dataIndex: 'cost',
            },
            {
                title: '日期',
                dataIndex: 'date',
            },
            {
                title: '开始时间',
                dataIndex: 'starttime'
            },
            {
                title: '结束时间',
                dataIndex: 'endtime'
            },
            {
                title: '操作',
                dataIndex: 'option',
                valueType: 'option',
                render: (_: any, record: any) => (
                    <a onClick={() => this.props.appointVisit({
                        schedulingId: record.schedulingid,
                        status: 1,
                        patientId: userData.patientId,
                        patientName: userData.patientName
                    })}>
                        预约
                    </a>
                ),
            },
        ];

        const patientRecordColumns = [
            {
                title: '就诊日期',
                dataIndex: 'date'
            },
            {
                title: '开始时间',
                dataIndex: 'starttime',
            },
            {
                title: '结束时间',
                dataIndex: 'endtime',
            },
            {
                title: '医生姓名',
                dataIndex: 'doctorname',
            },
            {
                title: '诊室',
                dataIndex: 'roomname',
            }
        ];


        return (
            <>
                <Row>
                    <Col span={18}>
                        <Form style={{marginTop: 20, marginBottom: 20}}>
                            <Row>
                                <Col span={5}>
                                    <FormItem key="doctorname" {...formLayout} label="医生">
                                        {form.getFieldDecorator('doctorname', {})(
                                            <Input placeholder={"请输入医生姓名"}/>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={5}>
                                    <FormItem key="departmentname" {...formLayout} label="科室">
                                        {form.getFieldDecorator('departmentname', {})(
                                            <Select
                                                allowClear={true}
                                                style={{
                                                    width: '100%',
                                                }}
                                            >
                                                {
                                                    departmentList && departmentList.map((item: any) => (
                                                        <Option key={item.departmentid}
                                                                value={item.departmentid}>{item.name}</Option>
                                                    ))
                                                }
                                            </Select>,
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={5}>
                                    <FormItem key="date" {...formLayout} label="日期">
                                        {form.getFieldDecorator('date', {})(
                                            <DatePicker placeholder={"请选择日期"}/>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={4}>
                                    <Button type={"primary"} onClick={this.handleSearch}>查询</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                    <Col span={6}>
                        <Button onClick={this.queryPatientRecord} style={{marginTop: 25}}>我的预约记录</Button>
                    </Col>
                </Row>
                <Table dataSource={scheduleList} columns={columns} loading={loading}/>
                <Modal
                    className={style.patientRecordModal}
                    destroyOnClose
                    title="我的预约记录"
                    visible={this.state.patientRecordModalVisible}
                    footer={null}
                    onCancel={() => {
                        this.setState({
                            patientRecordModalVisible: false
                        })
                    }}
                >
                    <Table dataSource={patientRecord} loading={loading} columns={patientRecordColumns}/>
                </Modal>
            </>
        );
    }
}

export const AppointVisitForm = Form.create()(AppointVisit);