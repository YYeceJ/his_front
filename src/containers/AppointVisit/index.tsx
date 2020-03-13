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
import {querySchedule, appointVisit, queryDepartment} from './actions';
import {RouteComponentProps} from 'react-router-dom';
import {FormComponentProps} from "antd/lib/form";
import moment from "moment";

const FormItem = Form.Item;
const {Option} = Select;

interface AppointVisitOwnProps extends RouteComponentProps<any>, FormComponentProps {
}

interface AppointVisitStateProps {
    loading?: any,
    scheduleList?: any,
    departmentList?: any,
}

interface AppointVisitDispatchProps {
    querySchedule?: Function,
    appointVisit?: Function,
    queryDepartment?: Function,
}

interface AppointVisitState {
}

@(connect(
    (state: any) => (
        {
            loading: state.appointVisitReducer.loading,
            scheduleList: state.appointVisitReducer.scheduleList,
            departmentList: state.appointVisitReducer.departmentList,
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
            }
        }
    )
) as any)
class AppointVisit extends React.Component<AppointVisitStateProps & AppointVisitDispatchProps & AppointVisitOwnProps, AppointVisitState> {

    constructor(props: AppointVisitStateProps & AppointVisitDispatchProps & AppointVisitOwnProps) {
        super(props);
        this.state = {}
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
        this.props.querySchedule({status: 0, ...param});
    }

    render() {
        const {loading, form, scheduleList, departmentList} = this.props;

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
                dataIndex: 'starttime',
                render: (text: any) => (moment(text).format('HH:mm'))
            },
            {
                title: '结束时间',
                dataIndex: 'endtime',
                render: (text: any) => (moment(text).format('HH:mm'))
            },
            {
                title: '操作',
                dataIndex: 'option',
                valueType: 'option',
                render: (_: any, record: any) => (
                    <a onClick={() => this.props.appointVisit(record.schedulingId)}>
                        预约
                    </a>
                ),
            },
        ];

        return (
            <>
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
                                        style={{
                                            width: '100%',
                                        }}
                                    >
                                        {
                                            departmentList && departmentList.map((item: any) => (
                                                <Option key={item.departmentid}
                                                        value={item.departmentid}>{item.departmentname}</Option>
                                            ))
                                        }
                                    </Select>,
                                )}
                            </FormItem>
                        </Col>
                        <Col span={4}>
                            <Button type={"primary"} onClick={this.handleSearch}>查询</Button>
                        </Col>
                    </Row>
                </Form>
                <Table dataSource={scheduleList} columns={columns} loading={loading}/>
            </>
        );
    }
}

export const AppointVisitForm = Form.create()(AppointVisit);