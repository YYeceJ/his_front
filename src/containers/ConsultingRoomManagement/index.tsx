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
    Row, Spin
} from 'antd';
import {connect} from 'react-redux';
import {
    queryConsultingRoom,
    deleteConsultingRoom,
    updateConsultingRoom,
    addConsultingRoom,
    queryDepartment
} from './actions';
import {RouteComponentProps} from 'react-router-dom';
import {FormComponentProps} from "antd/lib/form";

const FormItem = Form.Item;
const {Option} = Select;

interface ConsultingRoomManagementOwnProps extends RouteComponentProps<any>, FormComponentProps {
}

interface ConsultingRoomManagementStateProps {
    loading?: any,
    consultingRoomList?: any,
    departmentList?: any,
}

interface ConsultingRoomManagementDispatchProps {
    queryConsultingRoom?: Function,
    deleteConsultingRoom?: Function,
    updateConsultingRoom?: Function,
    addConsultingRoom?: Function,
    queryDepartment?: Function
}

interface ConsultingRoomManagementState {
    modalVisible?: boolean;
    modalFunction?: string;
    currentRoomId?: number;
}

@(connect(
    (state: any) => (
        {
            loading: state.consultingRoomManagementReducer.loading,
            consultingRoomList: state.consultingRoomManagementReducer.consultingRoomList,
            departmentList: state.consultingRoomManagementReducer.departmentList,
        }
    ),
    (dispatch: any) => (
        {
            queryConsultingRoom: (param: any) => {
                dispatch(queryConsultingRoom(param));
            },
            deleteConsultingRoom: (param: any) => {
                dispatch(deleteConsultingRoom(param));
            },
            updateConsultingRoom: (param: any) => {
                dispatch(updateConsultingRoom(param));
            },
            addConsultingRoom: (param: any) => {
                dispatch(addConsultingRoom(param));
            },
            queryDepartment: (param: any) => {
                dispatch(queryDepartment(param));
            }
        }
    )
) as any)
class ConsultingRoomManagement extends React.Component<ConsultingRoomManagementStateProps & ConsultingRoomManagementDispatchProps & ConsultingRoomManagementOwnProps, ConsultingRoomManagementState> {

    constructor(props: ConsultingRoomManagementStateProps & ConsultingRoomManagementDispatchProps & ConsultingRoomManagementOwnProps) {
        super(props);
        this.state = {
            modalVisible: false,
            modalFunction: "",
            currentRoomId: 0
        }
    }

    componentDidMount() {
        this.props.queryDepartment();
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
            currentRoomId: record.roomid
        }, () => {
            this.props.form.setFieldsValue({
                consultingRoomName_A: record.consultingroomname
            })
        })
    }

    handleConfirmPost = () => {
        this.props.form.validateFields((err: any, values: any) => {
            if (!err) {
                const param = {
                    consultingRoomName: values.consultingRoomName_A,
                }
                if (this.state.modalFunction === "update") {
                    this.props.updateConsultingRoom({roomId: this.state.currentRoomId, ...param});
                } else {
                    this.props.addConsultingRoom(param);
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
        const values = this.props.form.getFieldsValue();
        let param: any;
        if (!!values.consultingRoomName_S) {
            param = {
                consultingroomname: values.consultingRoomName_S
            }
        }
        this.props.queryConsultingRoom(param);
    }

    render() {
        const {form, consultingRoomList, loading} = this.props;
        const {modalVisible} = this.state;
        const columns = [

            {
                title: '诊室名称',
                dataIndex: 'consultingroomname',
            },
            {
                title: '所属科室',
                dataIndex: 'departmentname',
            },
            {
                title: '操作',
                dataIndex: 'option',
                valueType: 'option',
                render: (_: any, record: any) => (
                    <>
                        <a onClick={() => this.handleUpdate(record)}>
                            修改
                        </a>
                        <Divider type="vertical"/>
                        <Popconfirm
                            title="确定删除诊室？"
                            onConfirm={() => this.props.deleteConsultingRoom({
                                roomId: record.roomid
                            })}
                            okText="确定"
                            cancelText="取消"
                        >
                            <a href="#">删除</a>
                        </Popconfirm>
                    </>
                ),
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
                        <Col span={6}>
                            <FormItem key="consultingRoomName_S" {...formLayout} label="诊室名称">
                                {form.getFieldDecorator('consultingRoomName_S', {})(
                                    <Input placeholder={"请输入诊室名称"}/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <Button type={"primary"} onClick={this.handleSearch}>查询</Button>
                        </Col>
                    </Row>
                </Form>
                <Button onClick={this.handleAdd} style={{marginBottom: 20}} type={"primary"}>添加诊室</Button>
                <Table dataSource={consultingRoomList} columns={columns}/>;
                <Modal
                    destroyOnClose
                    title="诊室管理"
                    visible={modalVisible}
                    onOk={this.handleConfirmPost}
                    onCancel={this.handleCancelPost}
                >
                    <FormItem key="consultingRoomName_A" {...formLayout} label="诊室名称">
                        {form.getFieldDecorator('consultingRoomName_A', {
                            rules: [{
                                required: true,
                                message: "请输入诊室名称"
                            }]
                        })(
                            <Input/>
                        )}
                    </FormItem>
                </Modal>
            </Spin>
        );
    }
}

export const ConsultingRoomManagementForm = Form.create()(ConsultingRoomManagement);