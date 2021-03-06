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
    Row, Spin, DatePicker, TimePicker, InputNumber, Tag
} from 'antd';
import {connect} from 'react-redux';
import {
    queryScheduling,
    deleteScheduling,
    updateScheduling,
    addScheduling,
    queryDepartment,
    queryConsultingRoom, queryDoctor
} from './actions';
import {RouteComponentProps} from 'react-router-dom';
import {FormComponentProps} from "antd/lib/form";
import moment from 'moment';


const FormItem = Form.Item;
const {Option} = Select;

interface SchedulingManagementOwnProps extends RouteComponentProps<any>, FormComponentProps {
}

interface SchedulingManagementStateProps {
    loading?: any,
    schedulingList?: any,
    departmentList?: any,
    doctorList?: any,
    consultingRoomList?: any,
}

interface SchedulingManagementDispatchProps {
    queryScheduling?: Function,
    deleteScheduling?: Function,
    updateScheduling?: Function,
    addScheduling?: Function,
    queryDepartment?: Function,
    queryConsultingRoom?: Function,
    queryDoctor?: Function,
}

interface SchedulingManagementState {
    modalVisible?: boolean;
    modalFunction?: string;
    currentRecord?: any;
}

@(connect(
    (state: any) => (
        {
            loading: state.schedulingManagementReducer.loading,
            schedulingList: state.schedulingManagementReducer.schedulingList,
            departmentList: state.schedulingManagementReducer.departmentList,
            doctorList: state.schedulingManagementReducer.doctorList,
            consultingRoomList: state.schedulingManagementReducer.consultingRoomList,
        }
    ),
    (dispatch: any) => (
        {
            queryScheduling: (param: any) => {
                dispatch(queryScheduling(param));
            },
            deleteScheduling: (param: any) => {
                dispatch(deleteScheduling(param));
            },
            updateScheduling: (param: any) => {
                dispatch(updateScheduling(param));
            },
            addScheduling: (param: any) => {
                dispatch(addScheduling(param));
            },
            queryDepartment: (param: any) => {
                dispatch(queryDepartment(param));
            },
            queryConsultingRoom: (param: any) => {
                dispatch(queryConsultingRoom(param));
            },
            queryDoctor: (param: any) => {
                dispatch(queryDoctor(param));
            }
        }
    )
) as any)
class SchedulingManagement extends React.Component<SchedulingManagementStateProps & SchedulingManagementDispatchProps & SchedulingManagementOwnProps, SchedulingManagementState> {

    constructor(props: SchedulingManagementStateProps & SchedulingManagementDispatchProps & SchedulingManagementOwnProps) {
        super(props);
        this.state = {
            modalVisible: false,
            modalFunction: "",
            currentRecord: {}

        }
    }

    componentDidMount() {
        this.props.queryDepartment();
        this.props.queryScheduling();
        this.props.queryDoctor();
        this.props.queryConsultingRoom();
    }

    handleAdd = () => {
        this.setState({
            modalVisible: true,
            modalFunction: "add"
        })
    }

    handleUpdate = (record: any) => {
        this.setState({
            modalVisible: true,
            modalFunction: "update",
            currentRecord: record
        }, () => {
            this.props.form.setFieldsValue({
                doctorId_A: record.doctorid + "//" + record.doctorname,
                roomId_A: record.roomid + "//" + record.roomname,
                cost: record.cost,
                date_A: moment(record.date),
                startTime_A: moment(record.starttime, 'HH:mm'),
                endTime_A: moment(record.endtime, 'HH:mm')
            })
        })
    }

    handleConfirmPost = () => {
        const userData = JSON.parse(localStorage.getItem("userData"));
        this.props.form.validateFields((err: any, values: any) => {
            if (!err) {
                const param = {
                    departmentId: userData.departmentid,
                    departmentName: userData.departmentname,
                    doctorId: parseInt(values.doctorId_A.split("//")[0]),
                    doctorName: values.doctorId_A.split("//")[1],
                    roomId: parseInt(values.roomId_A.split("//")[0]),
                    roomName: values.roomId_A.split("//")[1],
                    cost: values.cost,
                    date: moment(values.date_A).format('YYYY-MM-DD'),
                    startTime: moment(values.startTime_A).format('HH:mm:ss'),
                    endTime: moment(values.endTime_A).format('HH:mm:ss'),
                }
                if (this.state.modalFunction === "update") {
                    this.props.updateScheduling({schedulingId: this.state.currentRecord.schedulingid, ...param});
                } else {
                    this.props.addScheduling({
                        creatorId: userData.doctorid,
                        creatorName: userData.doctorname, ...param
                    });
                }
                this.setState({
                    modalVisible: false
                })
            }
        })
    }

    handleCancelPost = () => {
        this.setState({
            modalVisible: false
        })
    }

    handleSearch = () => {
        const values: any = this.props.form.getFieldsValue();
        const param: any = {}
        if (values.doctorId_S) {
            param.doctorid = values.doctorId_S;
        }
        if (values.consultingRoomId_S) {
            param.roomid = values.consultingRoomId_S;
        }
        if (values.date_S) {
            param.date = moment(values.date_S).format('YYYY-MM-DD').slice(0,11);
        }
        this.props.queryScheduling(param);
    }

    render() {
        const {form, schedulingList, consultingRoomList, loading, doctorList} = this.props;
        const {modalVisible} = this.state;
        const columns = [
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
                render: (text: any) => (moment(text).format('YYYY-MM-DD'))
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
                title: '状态',
                dataIndex: 'status',
                render: ((_: any, record: any) => {
                    let status:any;
                    switch (record.status) {
                        case 0:
                            status = <Tag color="magenta">未预约</Tag>;
                            break;
                        case 1:
                            status = <Tag color="cyan">已预约</Tag>;
                            break;
                        case 2:
                            status =  <Tag color="green">就诊中</Tag>;
                            break;
                        case 3:
                            status = <Tag color="volcano">已过期</Tag>;
                            break;
                    }
                    return status;
                })
            },
            {
                title: '操作',
                dataIndex: 'option',
                valueType: 'option',
                render: (_: any, record: any) => {
                    if (record.status === 0) {
                        return (
                            <>
                                <a onClick={() => this.handleUpdate(record)}>
                                    修改
                                </a>
                                <Divider type="vertical"/>
                                <Popconfirm
                                    title="确定删除排班？"
                                    onConfirm={() => this.props.deleteScheduling({schedulingId: record.schedulingid})}
                                    okText="确定"
                                    cancelText="取消"
                                >
                                    <a href="#">删除</a>
                                </Popconfirm>
                            </>
                        )
                    } else {
                        return <span>--</span>
                    }
                },
            },
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
                        <Col span={5}>
                            <FormItem key="consultingRoomId_S" {...formLayout} label="诊室">
                                {form.getFieldDecorator('consultingRoomId_S', {})(
                                    <Select
                                        allowClear={true}
                                        showSearch
                                        style={{
                                            width: '100%',
                                        }}
                                    >
                                        {
                                            consultingRoomList && consultingRoomList.map((item: any) => (
                                                <Option key={item.roomid}
                                                        value={item.roomid}>{item.consultingroomname}</Option>
                                            ))
                                        }
                                    </Select>,
                                )}
                            </FormItem>
                        </Col>
                        <Col span={5}>
                            <FormItem key="doctorId_S" {...formLayout} label="医生">
                                {form.getFieldDecorator('doctorId_S', {})(
                                    <Select
                                        allowClear={true}
                                        style={{
                                            width: '100%',
                                        }}
                                    >
                                        {
                                            doctorList && doctorList.map((item: any) => (
                                                <Option key={item.doctorid}
                                                        value={item.doctorid}>{item.doctorname}</Option>
                                            ))
                                        }
                                    </Select>,
                                )}
                            </FormItem>
                        </Col>
                        <Col span={5}>
                            <FormItem key="date_S" {...formLayout} label="就诊日期">
                                {form.getFieldDecorator('date_S', {})(
                                    <DatePicker placeholder={"请选择排班日期"}/>
                                )}
                            </FormItem>
                        </Col>

                        <Col span={4}>
                            <Button type={"primary"} onClick={this.handleSearch}>查询</Button>
                        </Col>
                    </Row>
                </Form>
                <Button onClick={this.handleAdd} style={{marginBottom: 20}} type={"primary"}>添加排班</Button>
                <Table dataSource={schedulingList} columns={columns}/>;
                <Modal
                    destroyOnClose
                    title="排班管理"
                    visible={modalVisible}
                    onOk={this.handleConfirmPost}
                    onCancel={this.handleCancelPost}
                >
                    <FormItem key="doctorId_A" {...formLayout} label="医生">
                        {form.getFieldDecorator('doctorId_A', {
                            rules: [
                                {
                                    required: true,
                                    message: "请选择医生"
                                }
                            ]
                        })(
                            <Select
                                allowClear={true}
                                style={{
                                    width: '100%',
                                }}
                            >
                                {
                                    doctorList && doctorList.map((item: any) => (
                                        <Option key={item.doctorid}
                                                value={item.doctorid + "//" + item.doctorname}>{item.doctorname}</Option>
                                    ))
                                }
                            </Select>,
                        )}
                    </FormItem>
                    <FormItem key="roomId_A" {...formLayout} label="诊室">
                        {form.getFieldDecorator('roomId_A', {
                            rules: [
                                {
                                    required: true,
                                    message: "请选择诊室"
                                }
                            ]
                        })(
                            <Select
                                allowClear={true}
                                style={{
                                    width: '100%',
                                }}
                            >
                                {
                                    consultingRoomList && consultingRoomList.map((item: any) => (
                                        <Option key={item.roomid}
                                                value={item.roomid + "//" + item.consultingroomname}>{item.consultingroomname}</Option>
                                    ))
                                }
                            </Select>,
                        )}
                    </FormItem>
                    <FormItem key="cost" {...formLayout} label="挂号费">
                        {form.getFieldDecorator('cost', {
                            rules: [
                                {
                                    required: true,
                                    message: "请输入挂号费"
                                },
                            ],
                            initialValue: 0
                        })(
                            <InputNumber
                                min={0}
                                formatter={(value: any) => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
                            />
                        )}
                    </FormItem>
                    <FormItem key="date_A" {...formLayout} label="日期">
                        {form.getFieldDecorator('date_A', {
                            rules: [
                                {
                                    required: true,
                                    message: "请选择日期"
                                }
                            ]
                        })(
                            <DatePicker placeholder={"请选择排班日期"}/>
                        )}
                    </FormItem>
                    <FormItem key="startTime_A" {...formLayout} label="开始时间">
                        {form.getFieldDecorator('startTime_A', {
                            rules: [
                                {
                                    required: true,
                                    message: "请选择开始时间"
                                }
                            ]
                        })(
                            <TimePicker placeholder={"请选择开始时间"}/>
                        )}
                    </FormItem>
                    <FormItem key="endTime_A" {...formLayout} label="结束时间">
                        {form.getFieldDecorator('endTime_A', {
                            rules: [
                                {
                                    required: true,
                                    message: "请选择诊室结束时间"
                                }
                            ]
                        })(
                            <TimePicker placeholder={"请选择结束时间"}/>
                        )}
                    </FormItem>
                </Modal>
            </Spin>
        );
    }
}

export const SchedulingManagementForm = Form.create()(SchedulingManagement);