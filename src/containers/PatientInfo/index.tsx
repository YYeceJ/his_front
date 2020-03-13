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
import {queryPatientInfo, updatePatientInfo} from './actions';
import {RouteComponentProps} from 'react-router-dom';
import {FormComponentProps} from "antd/lib/form";
import moment from "moment";

const FormItem = Form.Item;
const {Option} = Select;

interface PatientInfoOwnProps extends RouteComponentProps<any>, FormComponentProps {
}

interface PatientInfoStateProps {
    loading?: any,
    patientInfo?: any,
}

interface PatientInfoDispatchProps {
    queryPatientInfo?: Function,
    updatePatientInfo?: Function,
}

interface PatientInfoState {
}

@(connect(
    (state: any) => (
        {
            loading: state.patientInfoReducer.loading,
            patientInfo: state.patientInfoReducer.patientInfo
        }
    ),
    (dispatch: any) => (
        {
            queryPatientInfo: (param: any) => {
                dispatch(queryPatientInfo(param));
            },
            updatePatientInfo: (param: any) => {
                dispatch(updatePatientInfo(param));
            },
        }
    )
) as any)
class PatientInfo extends React.Component<PatientInfoStateProps & PatientInfoDispatchProps & PatientInfoOwnProps, PatientInfoState> {

    constructor(props: PatientInfoStateProps & PatientInfoDispatchProps & PatientInfoOwnProps) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        //TODO patientid
        this.props.queryPatientInfo({patientid:1});
    }

    handleSubmitEdit = () => {
        this.props.form.validateFields((err: any, values: any) => {
            if (!err) {
                //TODO patientid
                this.props.updatePatientInfo({
                    patientid:1,
                    patientname:values.papatientname,
                    gender:values.gender,
                    phone:values.phone,
                    birthdate:values.birthdate
                });
            }
        })
    }

    render() {
        const {patientInfo, form, loading} = this.props;
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
                <Form style={{marginTop: 20, marginBottom: 20}} onSubmit={this.handleSubmitEdit}>
                    <FormItem key="patientname" {...formLayout} label="姓名">
                        {form.getFieldDecorator('patientname', {
                            initialValue: patientInfo.patientname,
                            rules: [{
                                required: true,
                                message: "请输入姓名"
                            }]
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem key="phone" {...formLayout} label="手机号">
                        {form.getFieldDecorator('phone', {
                            initialValue: patientInfo.phone,
                            rules: [{
                                required: true,
                                message: "请输入手机号"
                            }]
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem key="gender" {...formLayout} label="性别">
                        {form.getFieldDecorator('gender', {
                            initialValue: patientInfo.gender ? patientInfo.gender.toString() : ""
                        })(
                            <Radio.Group >
                                <Radio value="1">女</Radio>
                                <Radio value="2">男</Radio>
                            </Radio.Group>
                        )}
                    </FormItem>
                    <FormItem key="birthdate" {...formLayout} label="出生日期">
                        {form.getFieldDecorator('birthDate', {
                            initialValue: moment(patientInfo.birthdate),
                            rules: [{
                                required: true,
                                message: "请输入姓名"
                            }]
                        })(
                            <DatePicker placeholder={"请选择出生日期"}/>
                        )}
                    </FormItem>
                    <Button htmlType="submit" type="primary" style={{marginLeft:100}}>
                        提交
                    </Button>
                </Form>
            </Spin>

        );
    }
}

export const PatientInfoForm = Form.create()(PatientInfo);