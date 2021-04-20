<template>
    <table v-if="showPlaceHolder" class="table">
        <thead>
            <th>
                <content-placeholders>
                <content-placeholders-heading/>
                </content-placeholders>
            </th>
            <th>
                <content-placeholders>
                <content-placeholders-heading/>
                </content-placeholders>
            </th>
            <th>
                <content-placeholders>
                <content-placeholders-heading/>
                </content-placeholders>
            </th>
            <th>
                <content-placeholders>
                <content-placeholders-heading/>
                </content-placeholders>
            </th>
        </thead>
        <tbody>
            <tr>
                <td>
                    <content-placeholders>
                    <content-placeholders-text :lines="1" />
                    </content-placeholders>
                </td>
                <td>
                    <content-placeholders>
                    <content-placeholders-text :lines="1" />
                    </content-placeholders>
                </td>
                <td>
                    <content-placeholders>
                    <content-placeholders-text :lines="1" />
                    </content-placeholders>
                </td>
                <td>
                    <content-placeholders>
                    <content-placeholders-text :lines="1" />
                    </content-placeholders>
                </td>
            </tr>
            <tr>
                <td>
                    <content-placeholders>
                    <content-placeholders-text :lines="1" />
                    </content-placeholders>
                </td>
                <td>
                    <content-placeholders>
                    <content-placeholders-text :lines="1" />
                    </content-placeholders>
                </td>
                <td>
                    <content-placeholders>
                    <content-placeholders-text :lines="1" />
                    </content-placeholders>
                </td>
                <td>
                    <content-placeholders>
                    <content-placeholders-text :lines="1" />
                    </content-placeholders>
                </td>
            </tr>
            <tr>
                <td>
                    <content-placeholders>
                    <content-placeholders-text :lines="1" />
                    </content-placeholders>
                </td>
                <td>
                    <content-placeholders>
                    <content-placeholders-text :lines="1" />
                    </content-placeholders>
                </td>
                <td>
                    <content-placeholders>
                    <content-placeholders-text :lines="1" />
                    </content-placeholders>
                </td>
                <td>
                    <content-placeholders>
                    <content-placeholders-text :lines="1" />
                    </content-placeholders>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script>
export default {
    props:['show'],
    data(){
        return{
            showPlaceHolder:true,
            type:null
        }
    },
    watch:{
        show(newVal,oldVal){
            let data = JSON.parse(newVal)
            this.showPlaceHolder = data.isShown;
            this.type = data.type
        }
    }
}
</script>