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
import {queryVisitRecord} from './actions';
import {RouteComponentProps} from 'react-router-dom';
import {FormComponentProps} from "antd/lib/form";

const FormItem = Form.Item;
const {Option} = Select;

interface VisitRecordOwnProps extends RouteComponentProps<any>, FormComponentProps {
}

interface VisitRecordStateProps {
    loading?: any,
    visitRecordList?: any,
}

interface VisitRecordDispatchProps {
    queryVisitRecord?: Function,
}

interface VisitRecordState {
}

@(connect(
    (state: any) => (
        {
            loading: state.visitRecordReducer.loading,
            visitRecordList: state.visitRecordReducer.visitRecordList
        }
    ),
    (dispatch: any) => (
        {
            queryVisitRecord: (param: any) => {
                dispatch(queryVisitRecord(param));
            }
        }
    )
) as any)
class VisitRecord extends React.Component<VisitRecordStateProps & VisitRecordDispatchProps & VisitRecordOwnProps, VisitRecordState> {

    constructor(props: VisitRecordStateProps & VisitRecordDispatchProps & VisitRecordOwnProps) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        //todo patientid
        this.props.queryVisitRecord({patientid:1});
    }

    render() {
        const {visitRecordList, loading} = this.props;

        const columns = [
            {
                title: '医生',
                dataIndex: 'doctorname',
            },
            {
                title: '挂号费',
                dataIndex: 'cost',
            },
            {
                title: '就诊日期',
                dataIndex: 'date',
            },
            {
                title: '病人主诉',
                dataIndex: 'chiefcomplaint',
            },
            {
                title: '检查结果',
                dataIndex: 'examinationresult',
            },
            {
                title: '诊断结果',
                dataIndex: 'diagnosticresult',
            },
            {
                title: '医生建议',
                dataIndex: 'doctoropinion',
            },
            {
                title: '状态',
                dataIndex: 'status',
                render: ((_: any, record: any) => {
                    let status = "";
                    switch (record.status) {
                        case 0:
                            status = "未预约";
                            break;
                        case 1:
                            status = "已预约";
                            break;
                        case 2:
                            status = "就诊中";
                            break;
                        case 3:
                            status = "已过期";
                            break;
                    }
                    return status;
                })
            }
        ];

        return (
            <Table dataSource={visitRecordList} columns={columns} loading={loading} />
        );
    }
}

export const VisitRecordForm = Form.create()(VisitRecord);